import type { Interval } from "luxon";

export class Task {
    constructor(readonly name: string, public intervals: Interval[] = [], readonly id: string = name) {}
}