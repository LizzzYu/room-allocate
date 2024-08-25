import { AllocatedRoom, Guest, Room } from '../types/roomAllocation.types';

type DPEntry = { allocation: AllocatedRoom[]; totalPrice: number };

const getDefaultRoomAllocation = (
	guest: Guest,
	rooms: Room[]
): AllocatedRoom[] => {
	const { adult, child } = guest;
	const dp: Map<string, DPEntry> = new Map();

	const helper = (
		remainingAdults: number,
		remainingChildren: number,
		roomIndex: number
	): DPEntry => {
		if (remainingAdults === 0 && remainingChildren === 0)
			return { allocation: [], totalPrice: 0 };
		if (roomIndex >= rooms.length)
			return { allocation: [], totalPrice: Infinity };

		const key = `${remainingAdults}-${remainingChildren}-${roomIndex}`;
		if (dp.has(key)) return dp.get(key)!;

		const room = rooms[roomIndex];
		let bestAllocation: DPEntry = { allocation: [], totalPrice: Infinity };

		for (
			let adults = 0;
			adults <= Math.min(remainingAdults, room.capacity);
			adults++
		) {
			for (
				let children = 0;
				children <= Math.min(remainingChildren, room.capacity - adults);
				children++
			) {
				if (children > 0 && adults === 0) continue; // At least one adult must be with children

				const roomPrice =
					room.roomPrice +
					room.adultPrice * adults +
					room.childPrice * children;
				const next = helper(
					remainingAdults - adults,
					remainingChildren - children,
					roomIndex + 1
				);

				if (next.totalPrice < Infinity) {
					const currentPrice = roomPrice + next.totalPrice;
					if (currentPrice < bestAllocation.totalPrice) {
						bestAllocation = {
							allocation: [
								{
									adult: adults,
									child: children,
									price: roomPrice,
									roomIndex: roomIndex,
								},
								...next.allocation,
							],
							totalPrice: currentPrice,
						};
					}
				}
			}
		}

		// Also consider skipping the current room
		const skipCurrent = helper(
			remainingAdults,
			remainingChildren,
			roomIndex + 1
		);
		if (skipCurrent.totalPrice < bestAllocation.totalPrice) {
			bestAllocation = skipCurrent;
		}

		dp.set(key, bestAllocation);
		return bestAllocation;
	};

	const result = helper(adult, child, 0);
	return result.totalPrice === Infinity ? [] : result.allocation;
};

export default getDefaultRoomAllocation;
