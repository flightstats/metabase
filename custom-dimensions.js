// Github issue:
// https://github.com/metabase/metabase/issues/4717
// 
const columns = [{
  name: "ga:dimensionXX",
  displayName: "Custom Dimension XX",
  description: "The value of the requested custom dimension, where XX refers to the number or index of the custom dimension.",
  dataType: "STRING"
}];

// There are a few of these custom column types, each containing 'XX' (assuming there are no non-custom column types containing 'XX')
const replicableColumns = columns.find(column => column.name.includes('XX'));

const replicatedColumns = replicableColumns.map(column => {
  // Docs say up to 20 custom types
  return Array.apply(null, new Array(20)).map((_, index) => {
    const itemNumber = index + 1; //not base 0
    return {
      ...column,
      name: column.name.replace(/XX/, itemNumber),
      displayName: column.displayName.replace(/XX/, itemNumber),
      description: column.description.replace(/XX/, itemNumber),
    } // or return Object.assign(column, { newValues })
  });
});

// final column set
return columns.concat(columns, replicatedColumns);
