import { expect } from "chai";
import sinon from "sinon";
import {
  startStopwatch,
  stopStopwatch,
  resetStopwatch,
} from "../scripts/watch.js";

describe("Stopwatch Tests", () => {
  let clock;
  let timeElement;

  beforeEach(() => {
    // Fake DOM
    timeElement = document.createElement("div");
    timeElement.id = "time";
    document.body.appendChild(timeElement);

    // Setup fake timers
    clock = sinon.useFakeTimers();
  });

  it("should start the stopwatch and update time correctly", () => {
    startStopwatch();
    clock.tick(1000);
    expect(timeElement.innerHTML).to.equal("00:00:01");
    clock.tick(10000);
    expect(timeElement.innerHTML).to.equal("00:00:11");
    stopStopwatch();
    clock.tick(10000);
    expect(timeElement.innerHTML).to.equal("00:00:11");
    resetStopwatch();
    expect(timeElement.innerHTML).to.equal("00:00:00");
  });
});
