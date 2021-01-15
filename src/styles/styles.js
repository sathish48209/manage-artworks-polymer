import {
  css
} from 'lit-element';

export const utilityClasses = css `

	.flex {
		display: flex;
	}

	.flex-column {
		flex-direction: column;
	}

	.items-center {
		align-items: center;
		justify-content: center;
	}

	.align-center {
		align-items: center;
	}

	.justify-center {
		justify-content: center;
	}

	.justify-around {
		justify-content: space-around;
	}

	.justify-between {
		justify-content: space-between;
	}

	.text-center {
		text-align: center;
	}

	.ma-0 {
		margin: 0;
	}

	.pa-0 {
		padding: 0;
	}

	.py-8 {
		padding: 8px 0;
	}

	.px-8 {
		padding: 0 8px;
	}

	.pa-1r {
		padding: 1rem;
	}

	.fw-700 {
		font-weight: 700
	}

	.fw-900 {
		font-weight: 900
	}

	.mt-1r {
		margin-top: 1rem;
	}

	.w-100p {
		width: 100%;
	}
`;