import { describe, it, expect } from "vitest";
import { mount, config } from "@vue/test-utils";
import Movies from "../Movies/List.vue";

// Mock RouterLink globally
config.global.stubs = {
  RouterLink: true,
};

describe("Movies", () => {
  it("should render the list of movies and its columns", () => {
    const wrapper = mount(Movies);

    const table = wrapper.find("table");
    expect(table.exists()).toBe(true);

    const columns = wrapper.findAll("th");
    expect(columns[0].text()).toBe("Title");
    expect(columns[1].text()).toBe("Genre");
    expect(columns[2].text()).toBe("Year");
    expect(columns[3].text()).toBe("Actions");
  });

  it("should have a button to add a new movie", () => {
    const wrapper = mount(Movies);

    const button = wrapper.find("router-link-stub");
    expect(button.exists()).toBe(true);
    expect(button.attributes("to")).toBe("/add");
  });
});
