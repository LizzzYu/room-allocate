import colors from '@/app/styles/color';
import styled from 'styled-components';

export const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
`;

export const Button = styled.button<{ disabled: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 48px;
	height: 48px;
	font-size: 16px;
	background-color: white;
	border: 1px solid ${colors.primary};
	border-radius: 4px;
	cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
	opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
	&:disabled {
		pointer-events: none;
	}
`;

export const Input = styled.input<{ disabled: boolean }>`
	background-color: white;
	color: ${colors.textPrimary};
	width: 48px;
	height: 48px;
	font-size: 16px;
	text-align: center;
	border: ${colors.border} 1px solid;
	border-radius: 4px;
	box-sizing: border-box;

	/* Hide the spin buttons */
	-moz-appearance: textfield; /* Firefox */
	appearance: textfield; /* Standard syntax */

	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none; /* Chrome, Safari, Edge, Opera */
	}

	&:disabled {
		opacity: 0.5;
	}

	&:focus {
		border-color: ${colors.highlight};
		outline: none;
		box-shadow: 0 0 2px 1px ${colors.highlight};
	}
`;
