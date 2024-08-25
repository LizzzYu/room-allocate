import getDefaultRoomAllocation from '../../src/app/utils/getDefaultRoomAllocation';

import { describe, test, expect } from '@jest/globals';

describe('getDefaultRoomAllocation', () => {
	test('successfully allocate 4 adults and 2 children', () => {
		const guest = { adult: 4, child: 2, total: 6 };
		const rooms = [
			{ roomPrice: 1000, adultPrice: 200, childPrice: 100, capacity: 4 },
			{ roomPrice: 0, adultPrice: 500, childPrice: 500, capacity: 4 },
			{ roomPrice: 500, adultPrice: 300, childPrice: 200, capacity: 4 },
		];
		const expected = [
			{ adult: 2, child: 0, price: 1000, roomIndex: 1 },
			{ adult: 2, child: 2, price: 1500, roomIndex: 2 },
		];
		expect(getDefaultRoomAllocation(guest, rooms)).toEqual(expected);
	});

	test('successfully allocate 16 adults', () => {
		const guest = { adult: 16, child: 0, total: 16 };
		const rooms = [
			{ roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
			{ roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
			{ roomPrice: 0, adultPrice: 500, childPrice: 300, capacity: 8 },
			{ roomPrice: 500, adultPrice: 1000, childPrice: 600, capacity: 2 },
		];
		const expected = [
			{ adult: 4, child: 0, price: 2500, roomIndex: 0 },
			{ adult: 4, child: 0, price: 2500, roomIndex: 1 },
			{ adult: 8, child: 0, price: 4000, roomIndex: 2 },
		];
		expect(getDefaultRoomAllocation(guest, rooms)).toEqual(expected);
	});

	test('cannot allocate when there is only 1 child', () => {
		const guest = { adult: 0, child: 1, total: 1 };
		const rooms = [
			{ roomPrice: 1000, adultPrice: 500, childPrice: 300, capacity: 2 },
			{ roomPrice: 500, adultPrice: 400, childPrice: 300, capacity: 4 },
			{ roomPrice: 0, adultPrice: 500, childPrice: 300, capacity: 8 },
		];
		const expected: [] = [];
		expect(getDefaultRoomAllocation(guest, rooms)).toEqual(expected);
	});
});
