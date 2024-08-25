'use client';

import RoomAllocation from './components/RoomAllocation/RoomAllocation';
import { mockGuest } from './data/guest';
import { mockRooms } from './data/rooms';
import { AllocatedRoom } from './types/roomAllocation.types';

export default function Home() {
	const handleChange = (result: AllocatedRoom[]) => {
		console.log('Updated room allocation:', result);
	};

	return (
		<div style={{ width: '375px', margin: '0 auto' }}>
			<RoomAllocation
				guest={mockGuest}
				rooms={mockRooms}
				onChange={handleChange}
			/>
		</div>
	);
}
