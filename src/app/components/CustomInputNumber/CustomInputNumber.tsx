import React, { useRef, useEffect, useState } from 'react';
import { Wrapper, Input } from './CustomInputNumber.styles';
import CustomInputNumberControlButton from './CustomInputNumberControlButton';
import { CustomInputNumberProps } from '@/app/types/roomAllocation.types';

interface CustomInputNumberExtendedProps extends CustomInputNumberProps {
	disableIncrement?: boolean;
}

const CustomInputNumber: React.FC<CustomInputNumberExtendedProps> = ({
	min,
	max,
	step,
	name,
	value,
	disabled,
	onChange,
	onBlur,
	disableIncrement = false,
}) => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const [internalValue, setInternalValue] = useState<number>(value);
	const [isInputEmpty, setIsInputEmpty] = useState<boolean>(false);

	useEffect(() => {
		setInternalValue(value);
	}, [value]);

	const handleChange = (newValue: string) => {
		if (newValue === '') {
			setIsInputEmpty(true);
			setInternalValue(min);
			return;
		}

		let numericValue = Number(newValue.replace(/^0+/, ''));

		if (numericValue > max) {
			numericValue = max;
		} else if (numericValue < min) {
			numericValue = min;
		}

		setInternalValue(numericValue);
		setIsInputEmpty(false);

		if (inputRef.current) {
			inputRef.current.value = numericValue.toString();
		}

		const customEvent = {
			target: inputRef.current!,
			currentTarget: inputRef.current!,
			bubbles: true,
			cancelable: false,
		} as React.ChangeEvent<HTMLInputElement>;

		setTimeout(() => {
			onChange(customEvent);
		}, 0);
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		handleChange(newValue);
	};

	const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
		let numericValue = Number(event.target.value);
		if (isNaN(numericValue) || numericValue < min) {
			numericValue = min;
		} else if (numericValue > max) {
			numericValue = max;
		}

		event.target.value = numericValue.toString();

		setIsInputEmpty(false);
		onChange(event);
		onBlur(event);
	};

	const handleMouseDown = (delta: number) => {
		if (disabled) return;

		if (
			(delta > 0 && internalValue < max) ||
			(delta < 0 && internalValue > min)
		) {
			handleChange((internalValue + delta).toString());
		}

		timeoutRef.current = setTimeout(() => {
			intervalRef.current = setInterval(() => {
				setInternalValue((prevValue) => {
					const newValue = prevValue + delta;
					if (newValue >= min && newValue <= max) {
						handleChange(newValue.toString());
					} else {
						clearInterval(intervalRef.current!);
						intervalRef.current = null;
					}
					return newValue;
				});
			}, 100);
		}, 500);
	};

	const handleMouseUp = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	const handleMouseLeave = () => {
		handleMouseUp();
	};

	const incrementDisabled =
		disabled || disableIncrement || internalValue >= max;
	const decrementDisabled = disabled || internalValue <= min;

	return (
		<Wrapper>
			<CustomInputNumberControlButton
				disabled={decrementDisabled}
				onMouseDown={() => handleMouseDown(-step)}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseLeave}
				icon="/icons/minus.svg"
				alt="minus"
			/>
			<Input
				ref={inputRef}
				type="number"
				name={name}
				value={isInputEmpty ? '' : internalValue}
				onChange={handleInputChange}
				onBlur={handleBlur}
				min={min}
				max={max}
				step={step}
				disabled={disabled}
			/>
			<CustomInputNumberControlButton
				disabled={incrementDisabled}
				onMouseDown={() => handleMouseDown(step)}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseLeave}
				icon="/icons/plus.svg"
				alt="plus"
			/>
		</Wrapper>
	);
};

export default CustomInputNumber;
