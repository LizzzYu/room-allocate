import React, { ChangeEvent, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import CustomInputNumber from '../CustomInputNumber/CustomInputNumber';
import { RoomAllocationCardProps } from '@/app/types/roomAllocation.types';
import colors from '@/app/styles/color';

const Wrapper = styled.div`
	width: 100%;

	&:not(:nth-last-child(1)) {
		border-bottom: 1px solid ${colors.textSecondary};
		padding-bottom: 18px;
	}
`;

const Label = styled.p`
	font-size: 14px;
	font-weight: 400;
	color: ${colors.textDark};
	margin: 0 0 4px 0;
`;

const Age = styled.span`
	font-size: 14px;
	font-weight: 400;
	color: ${colors.textSecondary};
`;

const ContentWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	justify-content: space-between;

	&:not(:nth-last-child(1)) {
		padding-bottom: 20px;
	}
`;

const calculateMax = (
	remain: number,
	input: number,
	capacity: number,
	roomCapacity: number
) => Math.min(remain + input, capacity - roomCapacity + input);

const RoomAllocationCard: React.FC<RoomAllocationCardProps> = ({
	disabled,
	step,
	name,
	remainAdults,
	remainChildren,
	adultValue,
	childValue,
	capacity,
	onChange,
	onBlur,
}) => {
	const [adultInput, setAdultInput] = useState<number>(adultValue);
	const [childrenInput, setChildrenInput] = useState<number>(childValue);
	const roomCapacity = adultInput + childrenInput;

	useEffect(() => {
		setAdultInput(adultValue);
		setChildrenInput(childValue);
	}, [adultValue, childValue]);

	const handleAdultChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const newValue = Number(event.target.value);
			if (newValue !== adultInput) {
				setAdultInput(newValue);
				onChange(event);
			}
		},
		[adultInput, onChange]
	);

	const handleChildrenChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const newValue = Number(event.target.value);
			if (newValue !== childrenInput) {
				setChildrenInput(newValue);
				onChange(event);
			}
		},
		[childrenInput, onChange]
	);

	return (
		<Wrapper>
			<h4>房間：{adultInput + childrenInput} 人</h4>
			<ContentWrapper>
				<div>
					<Label>大人</Label>
					<Age>年齡 20+</Age>
				</div>
				<CustomInputNumber
					disabled={disabled}
					min={1}
					max={calculateMax(remainAdults, adultInput, capacity, roomCapacity)}
					step={step}
					name={`${name}-adult`}
					value={adultInput}
					onChange={handleAdultChange}
					onBlur={onBlur}
					disableIncrement={remainAdults === 0 || roomCapacity >= capacity}
				/>
			</ContentWrapper>
			<ContentWrapper>
				<div>
					<Label>小孩</Label>
				</div>
				<CustomInputNumber
					disabled={disabled}
					min={0}
					max={calculateMax(
						remainChildren,
						childrenInput,
						capacity,
						roomCapacity
					)}
					step={step}
					name={`${name}-child`}
					value={childrenInput}
					onChange={handleChildrenChange}
					onBlur={onBlur}
					disableIncrement={remainChildren === 0 || roomCapacity >= capacity}
				/>
			</ContentWrapper>
		</Wrapper>
	);
};

export default RoomAllocationCard;
