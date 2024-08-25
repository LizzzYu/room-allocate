import React from 'react';
import { Button } from './CustomInputNumber.styles';
import Image from 'next/image';

interface CustomInputNumberControlButtonProps {
	disabled: boolean;
	onMouseDown: () => void;
	onMouseUp: () => void;
	onMouseLeave: () => void; // 新增 onMouseLeave prop
	icon: string;
	alt: string;
}

const CustomInputNumberControlButton: React.FC<
	CustomInputNumberControlButtonProps
> = ({ disabled, onMouseDown, onMouseUp, onMouseLeave, icon, alt }) => {
	return (
		<Button
			disabled={disabled}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
			onMouseLeave={onMouseLeave} // 添加 onMouseLeave
		>
			<Image src={icon} alt={alt} width={24} height={24} />
		</Button>
	);
};

export default CustomInputNumberControlButton;
