export class Recipients {
    constructor(waiting: string[], received: string[]) {
        this.waiting = waiting;
        this.received = received;
    }
    waiting: string[];
    received: string[];
}