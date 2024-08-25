import React, {
	ChangeEvent,
	FocusEvent,
	useState,
	useMemo,
	useCallback,
} from 'react';
import styled from 'styled-components';
import RoomAllocationTag from './RoomAllocationTag';
import RoomAllocationCard from './RoomAllocationCard';
import {
	RoomAllocationProps,
	AllocatedRoom,
} from '@/app/types/roomAllocation.types';
import getDefaultRoomAllocation from '@/app/utils/getDefaultRoomAllocation';
import colors from '@/app/styles/color';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border: 2px black dotted;
	padding: 20px;
`;

const Title = styled.h3`
	width: 100%;
	color: ${colors.backgroundPrimary};
	margin: 0 0 18px 0;
`;

const DEFAULT_STEP = 1;

const RoomAllocation: React.FC<RoomAllocationProps> = ({
	guest,
	rooms,
	onChange,
}) => {
	const [allocatedRooms, setAllocatedRooms] = useState<AllocatedRoom[]>(() =>
		getDefaultRoomAllocation(guest, rooms)
	);

	const { remainAdults, remainChildren } = useMemo(() => {
		const totalAllocatedAdults = allocatedRooms.reduce(
			(sum, room) => sum + room.adult,
			0
		);
		const totalAllocatedChildren = allocatedRooms.reduce(
			(sum, room) => sum + room.child,
			0
		);
		return {
			remainAdults: guest.adult - totalAllocatedAdults,
			remainChildren: guest.child - totalAllocatedChildren,
		};
	}, [allocatedRooms, guest.adult, guest.child]);

	const handleBlur = useCallback((event: FocusEvent<HTMLInputElement>) => {
		console.log('Blur event:', event.target.name, event.target.value);
	}, []);

	const handleRoomChange = useCallback(
		(index: number, event: ChangeEvent<HTMLInputElement>) => {
			setAllocatedRooms((prevRooms) => {
				const updatedRooms = [...prevRooms];
				const previousRoom = updatedRooms[index];

				const { name, value } = event.target;
				const numericValue = Number(value);

				// update the adult and child number
				if (name?.includes('adult')) {
					updatedRooms[index] = { ...previousRoom, adult: numericValue };
				} else if (name?.includes('child')) {
					updatedRooms[index] = { ...previousRoom, child: numericValue };
				}

				// use remained room index to recalculate the price
				const room = rooms[previousRoom.roomIndex];
				const newPrice =
					room.roomPrice +
					room.adultPrice * updatedRooms[index].adult +
					room.childPrice * updatedRooms[index].child;
				updatedRooms[index].price = newPrice;

				// calculate the remaining adults and children
				const totalAdults = updatedRooms.reduce(
					(sum, room) => sum + room.adult,
					0
				);
				const totalChildren = updatedRooms.reduce(
					(sum, room) => sum + room.child,
					0
				);

				if (totalAdults <= guest.adult && totalChildren <= guest.child) {
					onChange(updatedRooms);
					return updatedRooms;
				}

				return prevRooms;
			});
		},
		[guest.adult, guest.child, onChange, rooms]
	);

	return (
		<Wrapper>
			<Title>
				{guest.adult} 位大人，{guest.child} 位小孩 / {allocatedRooms.length} 房
			</Title>
			<RoomAllocationTag
				remainAdults={remainAdults}
				remainChildren={remainChildren}
			/>
			{allocatedRooms.map((room, index) => (
				<RoomAllocationCard
					key={index}
					disabled={false}
					step={DEFAULT_STEP}
					name={`room-${index}`}
					adultValue={room.adult}
					childValue={room.child}
					capacity={rooms[index].capacity}
					remainAdults={remainAdults}
					remainChildren={remainChildren}
					onChange={(e) => handleRoomChange(index, e)}
					onBlur={handleBlur}
				/>
			))}
		</Wrapper>
	);
};

export default RoomAllocation;
