
import React from 'react';
import { useAppContext } from '../context/AppContext';
import Button from './ui/Button';
import Card from './ui/Card';

const DisclaimerModal: React.FC = () => {
  const { disclaimerAccepted, acceptDisclaimer } = useAppContext();

  if (disclaimerAccepted) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <Card className="max-w-lg w-full">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-brand-gold mb-4">Important Disclaimer</h2>
          <div className="space-y-4 text-brand-primary">
            <p>
              <strong className="font-bold">This is an educational tool, not financial advice.</strong>
            </p>
            <p>
              The information and simulations provided by QuantLeap AI are for educational and illustrative purposes only. They should not be considered as investment advice, recommendations, or endorsements to buy or sell any securities.
            </p>
            <p>
              Investing involves risk, including the possible loss of principal. Past performance is not indicative of future results.
            </p>
            <p>
              Please consult with a qualified financial professional before making any investment decisions.
            </p>
          </div>
          <div className="mt-6 flex justify-end">
            <Button onClick={acceptDisclaimer}>I Understand and Agree</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DisclaimerModal;