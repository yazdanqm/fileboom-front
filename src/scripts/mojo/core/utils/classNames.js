import utilityProperties from "../newDynamicCss/utilityProperties.js";
import staticUtilities from "../newDynamicCss/staticUtilities.js";

export default class SplitClassName {
  constructor(className, userUtilities) {
    let isImportant = false;
    if (className.startsWith("!")) {
      isImportant = true;
      className = className.substring(1);
    }

    /*
        if (!className.includes("-(")) {
          const classNameSpl = className.split("-");
          className = className.replace(/\(/g, "\\(");
          className = className.replace(/\)/g, "\\)");
          className = className.replace(/,/g, "\\,");
          className = className.replace(/\./g, "\\.");
          className = className.replace(/#/g, "\\#");
          className = className.replace(/'/g, "\\'");

          let pre = classNameSpl.shift();
          let suf = classNameSpl.pop();
          if (className.startsWith("-")) {
            pre = classNameSpl.shift();
            suf += "-";
          }
          if (suf === undefined) {
            suf = pre;
          }

          return {
            className,
            suf,
            pre,
            mid: classNameSpl.join("-"),
            isImportant,
          };
        } else {
          const classNameSplDynamic = className.split("-(");
          const classNameSpl = classNameSplDynamic[0].split("-");
          className = className.replace(/\(/g, "\\(");
          className = className.replace(/\)/g, "\\)");
          className = className.replace(/,/g, "\\,");
          className = className.replace(/\./g, "\\.");
          className = className.replace(/#/g, "\\#");
          className = className.replace(/\+/g, "\\+");
          className = className.replace(/\:/g, "\\:");
            className = className.replace(/%/g, "\\%");

          let pre = classNameSpl.shift();
          let suf = "(" + classNameSplDynamic[1];
          if (className.startsWith("-")) {
            pre = classNameSpl.shift();
            suf += "-";
          }
          if (suf === undefined) {
            suf = pre;
          }

          return {
            className,
            suf,
            pre,
            mid: classNameSpl.join("-"),
            isImportant,
          };
        }
        */

    const classNameAppends = className.split("[");
    let appends;
    if (classNameAppends[1])
      appends = classNameAppends[1]
        .substring(0, classNameAppends[1].length - 1)
        .split(",");

    const classNameSplDynamic = classNameAppends[0].split("-(");
    const classNameSpl = classNameSplDynamic[0].split("-");
    let isNegative = false;
    if (classNameSpl[0] === "" && classNameSpl[1] !== "") {
      classNameSpl.shift();
      isNegative = true;
    }
    className = className.replace(/\(/g, "\\(");
    className = className.replace(/\)/g, "\\)");
    className = className.replace(/,/g, "\\,");
    className = className.replace(/\./g, "\\.");
    className = className.replace(/#/g, "\\#");
    className = className.replace(/\+/g, "\\+");
    className = className.replace(/\*/g, "\\*");
    className = className.replace(/\:/g, "\\:");
    className = className.replace(/%/g, "\\%");
    className = className.replace(/\[/g, "\\[");
    className = className.replace(/\]/g, "\\]");
    className = className.replace(/\\_/g, "\\\\_");

    let value = "",
      name = classNameSpl.join("-"),
      props = undefined,
      isForcedValue = false,
      body = undefined;

    if (classNameSplDynamic[1] !== undefined) {
      value = "(" + classNameSplDynamic[1];
      props = utilityProperties[name];
      if (props === undefined && utilityProperties["_"].includes(name)) {
        props = name;
      } else if (name.startsWith(":")) {
        props = name;
      } else if (
        userUtilities[name] !== undefined &&
        userUtilities[name].isStatic === false
      ) {
        props = userUtilities[name].props;
      }
      isForcedValue = true;
    } else {
      while (classNameSpl.length > 0) {
        name = classNameSpl.join("-");
        if (utilityProperties[name] !== undefined) {
          props = utilityProperties[name];
          break;
        }
        if (utilityProperties["_"].includes(name)) {
          props = name;
          break;
        }
        if (staticUtilities[name] !== undefined) {
          body = staticUtilities[name];
          break;
        }

        if (userUtilities[name] !== undefined) {
          let utl = userUtilities[name];
          if (utl.isStatic) body = utl.props;
          else props = utl.props;

          break;
        }

        if (value === "") value = classNameSpl.pop();
        else value = classNameSpl.pop() + "-" + value;
      }
    }

    if (name === "") {
      name = value;
    }

    if (isNegative) value = "-" + value;

    // todo remove
    // if (props === undefined)
    //   console.warn(
    //     "----------------WARNING: PROPERTY OF '" +
    //       className +
    //       "' NOT FOUND::::::::> classNames.js:112"
    //   );

    return {
      className,
      name,
      value,
      props,
      appends,
      body,
      isForcedValue,
      isImportant,
    };
  }
}
