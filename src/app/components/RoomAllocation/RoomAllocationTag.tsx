import React, { useMemo } from 'react';
import { RoomAllocationTagProps } from '@/app/types/roomAllocation.types';
import styled from 'styled-components';
import colors from '@/app/styles/color';

const Wrapper = styled.div`
	width: 100%;
	background-color: ${colors.backgroundSecondary};
	border: 1px solid ${colors.borderSecondary};
	border-radius: 4px;
`;

const Text = styled.p`
	font-size: 14px;
	padding-left: 14px;
	font-weight: 400;
	color: ${colors.textLight};
	text-align: left;
`;

const RoomAllocationTag: React.FC<RoomAllocationTagProps> = ({
	remainAdults,
	remainChildren,
}) => {
	const displayText = useMemo(
		() => `尚未分配人數：${remainAdults} 位大人，${remainChildren} 位小孩`,
		[remainAdults, remainChildren]
	);

	return (
		<Wrapper>
			<Text>{displayText}</Text>
		</Wrapper>
	);
};

export default RoomAllocationTag;
