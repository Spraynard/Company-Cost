import { filterFromObject } from "../../src/helpers/helpers";


describe("Filter From Object Works As Specified", () => {
	let test_object;

	beforeEach(() => {
		test_object = {
			1 : "Test",
			2 : "Test",
			3 : "Test",
			4 : "Test"
		};
	});

	test("Filters Single Item out of object", () => {
		expect(filterFromObject([1], test_object)).toEqual({
			2: "Test",
			3: "Test",
			4: "Test"
		});
	});

	test("Filters Multiple Items out of object", () => {
		expect(filterFromObject([1, 2], test_object)).toEqual({
			3: "Test",
			4: "Test"
		});
	});

	test("Filters by different type", () => {
		expect(filterFromObject(["1", "2"], test_object)).toEqual({
			3: "Test",
			4: "Test"
		});
	});

	test("Throws an error if we don't supply an array", () => {
		expect(() => filterFromObject("1", test_object)).toThrow();
	});
});