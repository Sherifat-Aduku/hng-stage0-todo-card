import "@testing-library/jest-dom";
import { JSDOM } from "jsdom";
import { readFileSync } from "fs";
import { expect, test, beforeEach } from "vitest";

let document;

beforeEach(() => {
  const html = readFileSync("./index.html", "utf-8");
  const dom  = new JSDOM(html, { runScripts: "dangerously" });
  document   = dom.window.document;
});

test("renders the correct title", () => {
  const el = document.querySelector("[data-testid='test-todo-title']");
  expect(el).not.toBeNull();
  expect(el.textContent.trim()).toBe("Sherifat's Todo Card");
});

test("renders the priority badge", () => {
  const el = document.querySelector("[data-testid='test-todo-priority']");
  expect(el).not.toBeNull();
  expect(el.textContent.trim()).toContain("High");
});

test("renders the description", () => {
  const el = document.querySelector("[data-testid='test-todo-description']");
  expect(el).not.toBeNull();
  expect(el.textContent.trim()).toBeTruthy();
});

test("renders the due date", () => {
  const el = document.querySelector("[data-testid='test-todo-due-date']");
  expect(el).not.toBeNull();
  expect(el.textContent.trim()).toContain("Apr 16, 2026");
});

test("renders the time remaining", () => {
  const el = document.querySelector("[data-testid='test-todo-time-remaining']");
  expect(el).not.toBeNull();
  expect(el.textContent.trim()).toBeTruthy();
});

test("renders the status badge", () => {
  const el = document.querySelector("[data-testid='test-todo-status']");
  expect(el).not.toBeNull();
  expect(el.textContent.trim()).toBe("Pending");
});

test("renders all tags", () => {
  const work   = document.querySelector("[data-testid='test-todo-tag-work']");
  const urgent = document.querySelector("[data-testid='test-todo-tag-urgent']");
  const design = document.querySelector("[data-testid='test-todo-tag-design']");
  expect(work.textContent.trim()).toBe("Work");
  expect(urgent.textContent.trim()).toBe("Urgent");
  expect(design.textContent.trim()).toBe("Design");
});

test("renders the complete toggle checkbox", () => {
  const el = document.querySelector("[data-testid='test-todo-complete-toggle']");
  expect(el).not.toBeNull();
  expect(el.type).toBe("checkbox");
});

test("renders the edit button", () => {
  const el = document.querySelector("[data-testid='test-todo-edit-button']");
  expect(el).not.toBeNull();
  expect(el.textContent.trim()).toContain("Edit");
});

test("renders the delete button", () => {
  const el = document.querySelector("[data-testid='test-todo-delete-button']");
  expect(el).not.toBeNull();
  expect(el.textContent.trim()).toContain("Delete");
});