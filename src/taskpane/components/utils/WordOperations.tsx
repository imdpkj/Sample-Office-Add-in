import { FullUser, User } from "./Types";
import { isArray } from "util";

const PragraphRegex = /\{(\d+?)\}.*\{(.*)\}.*\{(.*)\}/;

/**
 * A better of scenerio here can be binding - Bindings.addFromSelectionAsync
 * and couple of handler for them,
 * Office.context.document.addHandlerAsync("bindingDataChanged", function () {});
 * Office.context.document.addHandlerAsync("bindingSelectionChanged", function () {});
 *
 * This is not added to save some time.
 */

export default class WordOperations {
  static transform = (user: User): string => {
    let response = "User Data - ";

    response += `ID: {${user.id}}; `;
    response += `Name: {${user.first_name} ${user.last_name}}; `;
    response += `Email: {${user.email}};`;

    return response;
  };

  static addUser = async (user: FullUser) => {
    Word.run(async context => {
      context.document.body.insertParagraph(WordOperations.transform(user.data), Word.InsertLocation.end);
      await context.sync();

      /*
      const range = context.document.getSelection();
      range.insertText(WordOperations.transform(user), Word.InsertLocation.after).select(Word.SelectionMode.end);
      range.load("text");
      await context.sync();
      */
    });
  };

  static update = async (users: User[]) => {
    const map = new Map<string, User>();

    users.forEach(user => {
      map.set(user.id.toString(), user);
    });

    Word.run(async context => {
      let paragraph = context.document.body.paragraphs.getFirstOrNullObject();
      while (paragraph) {
        paragraph.load("text");
        await context.sync();
        const text = paragraph.text.trim();
        if (text.startsWith("User Data")) {
          const matches = PragraphRegex.exec(text);

          if (matches && isArray(matches) && matches.length === 4) {
            const [, id, name, email] = matches;
            if (map.get(id)) {
              const user = map.get(id);
              if (name !== `${user.first_name} ${user.last_name}` || email !== user.email) {
                paragraph.insertText(WordOperations.transform(user), Word.InsertLocation.replace);
                paragraph.font.set({
                  bold: true
                });
              }
            }
          }
        }

        paragraph = paragraph.getNextOrNullObject();
      }

      await context.sync();
    });
  };
}
