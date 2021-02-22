//import type { Interval } from "luxon";

export class Task {
    constructor(readonly name: string, public intervals: string[] = [], readonly id: string = name) {}
}