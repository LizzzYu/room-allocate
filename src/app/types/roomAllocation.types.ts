export interface Guest {
	adult: number;
	child: number;
}

export interface Room {
	roomPrice: number;
	adultPrice: number;
	childPrice: number;
	capacity: number;
}

export type AllocatedRoom = {
	adult: number;
	child: number;
	price: number;
	roomIndex: number;
};

export interface CustomInputNumberProps {
	min: number;
	max: number;
	step: number;
	name: string;
	value: number;
	disabled: boolean;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export interface RoomAllocationProps {
	guest: Guest;
	rooms: Room[];
	onChange: (result: AllocatedRoom[]) => void;
}

export interface RoomAllocationTagProps {
	remainAdults: number;
	remainChildren: number;
}

export interface RoomAllocationCardProps {
	disabled: boolean;
	step: number;
	name: string;
	remainAdults: number;
	remainChildren: number;
	adultValue: number;
	childValue: number;
	capacity: number;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}
