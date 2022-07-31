import {v4} from "uuid";

export default class IdGeneratorMock {

    generateId(): string{
	return v4();
    }
}