import { Guest, Room, AllocatedRoom } from '../types/roomAllocation.types';

const getDefaultRoomAllocation = (
	guest: Guest,
	rooms: Room[]
): AllocatedRoom[] => {
	const { adult, child } = guest;
	const totalGuests = adult + child;
	const sortedRooms = rooms.sort(
		(a, b) =>
			a.roomPrice +
			a.adultPrice +
			a.childPrice -
			(b.roomPrice + b.adultPrice + b.childPrice)
	);

	const allocatedRooms: AllocatedRoom[] = [];
	let remainingAdults = adult;
	let remainingChildren = child;

	// check if the total capacity of the rooms is enough for the guests
	const totalCapacity = rooms.reduce((acc, room) => acc + room.capacity, 0);
	if (totalCapacity < totalGuests) {
		return [];
	}

	for (const room of sortedRooms) {
		if (remainingAdults === 0 && remainingChildren === 0) break;

		// when the number of children is greater than 0, at least one adult is needed
		let maxAdults = room.capacity - (remainingChildren > 0 ? 1 : 0);
		let allocatedAdults = Math.min(remainingAdults, maxAdults);
		let allocatedChildren = Math.min(
			remainingChildren,
			room.capacity - allocatedAdults
		);

		// if there are children but no adults are allocated, and there are remaining adults
		if (allocatedChildren > 0 && allocatedAdults === 0) {
			if (remainingAdults > 0) {
				allocatedAdults = 1; // allocate at least one adult
				allocatedChildren = Math.min(
					remainingChildren,
					room.capacity - allocatedAdults
				);
			} else {
				// there are no remaining adults, but we need an adult to allocate the children, skip this room
				continue;
			}
		}

		if (allocatedAdults + allocatedChildren > room.capacity) {
			continue; // if the number of allocated adults and children exceeds the room capacity, skip this room
		}

		const roomPrice =
			room.roomPrice +
			room.adultPrice * allocatedAdults +
			room.childPrice * allocatedChildren;

		allocatedRooms.push({
			adult: allocatedAdults,
			child: allocatedChildren,
			price: roomPrice,
		});

		remainingAdults -= allocatedAdults;
		remainingChildren -= allocatedChildren;
	}

	if (remainingAdults > 0 || remainingChildren > 0) {
		return [];
	}

	return allocatedRooms;
};

export default getDefaultRoomAllocation;
