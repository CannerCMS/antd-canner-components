class CreateOp {
  constructor({idPath, value}) {
    this.idPath = idPath;
    this.value = value;
  }

  mutate(cannerJSON) {
    return cannerJSON.setIn(this.idPath, this.value);
  }
}

class UpdateOp {
  constructor({idPath, value}) {
    this.idPath = idPath;
    this.value = value;
  }

  mutate(cannerJSON) {
    return cannerJSON.setIn(this.idPath, this.value);
  }
}

class DeleteOp {
  constructor({idPath}) {
    this.idPath = idPath;
  }

  mutate(cannerJSON) {
    return cannerJSON.deleteIn(this.idPath);
  }
}

class SwapOp {
  constructor({firstIdPath, secondIdPath}) {
    this.firstIdPath = firstIdPath;
    this.secondIdPath = secondIdPath;
  }

  mutate(cannerJSON) {
    const firstValue = cannerJSON.getIn(this.firstIdPath);
    const secondValue = cannerJSON.getIn(this.secondIdPath);
    return cannerJSON.setIn(this.firstIdPath, secondValue)
                     .setIn(this.secondIdPath, firstValue);
  }
}

const createFromRes = (res, generateIdPath = id => [id]) => {
  const type = res[1];
  switch (type) {
    case "create":
      return new CreateOp({
        idPath: generateIdPath(res[0]),
        value: res[2]
      });

    case "update":
      return new UpdateOp({
        idPath: generateIdPath(res[0]),
        value: res[2]
      });

    case "delete":
      return new DeleteOp({
        idPath: generateIdPath(res[0])
      });

    case "swap":
      return new SwapOp({
        firstIdPath: generateIdPath(res[0].firstId),
        secondIdPath: generateIdPath(res[0].secondId)
      });

    default:
      throw new Error(`not supported qa type ${type}`);
  }
};

const createFromItem = (id, type, value, generateIdPath = id => [id]) => {
  switch (type) {
    case "create":
      return new CreateOp({
        idPath: generateIdPath(id),
        value
      });

    case "update":
      return new UpdateOp({
        idPath: generateIdPath(id),
        value
      });

    case "delete":
      return new DeleteOp({
        idPath: generateIdPath(id)
      });

    case "swap":
      return new SwapOp({
        firstIdPath: generateIdPath(id.firstId),
        secondIdPath: generateIdPath(id.secondId)
      });

    default:
      throw new Error(`not supported qa type ${type}`);
  }
};

export default {
  createFromRes,
  createFromItem,
  CreateOp,
  UpdateOp,
  DeleteOp,
  SwapOp
};
