import { BN } from '@project-serum/anchor';
import Decimal from 'decimal.js';
import { PoolFees } from '../types';

export interface OutResult {
  outAmount: BN;
  priceImpact: Decimal;
}

export interface SwapCurve {
  computeOutAmount(
    sourceAmount: BN,
    swapSourceAmount: BN,
    swapDestinationAmount: BN,
    tradeDirection: TradeDirection,
  ): OutResult;

  computeD(tokenAAmount: BN, tokenBAmount: BN): BN;

  computeInAmount(destAmount: BN, swapSourceAmount: BN, swapDestinationAmount: BN, tradeDirection: TradeDirection): BN;

  computeImbalanceDeposit(
    depositAAmount: BN,
    depositBAmount: BN,
    swapTokenAAmount: BN,
    swapTokenBAmount: BN,
    lpSupply: BN,
    fees: PoolFees,
  ): BN;

  computeWithdrawOne(
    lpAmount: BN,
    lpSupply: BN,
    swapTokenAAmount: BN,
    swapTokenBAmount: BN,
    fees: PoolFees,
    tradeDirection: TradeDirection,
  ): BN;
}

export enum TradeDirection {
  AToB,
  BToA,
}

export const getPriceImpact = (amount: BN, amountWithoutSlippage: BN): Decimal => {
  const diff = amountWithoutSlippage.sub(amount);
  return new Decimal(diff.toString()).div(new Decimal(amountWithoutSlippage.toString()));
};

export * from './stable-swap';
export * from './constant-product';
