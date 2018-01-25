export default function(schema, description) {
  return {
    type: "object",
    description,
    root: true,
    items: {
      ...schema
    }
  };
}
