'use client';

import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  { id: 'personal', name: 'personalInfo' },
  { id: 'financial', name: 'financialInfo' },
  { id: 'documents', name: 'documents' },
];

interface ProfileStepsProps {
  currentStep: string;
  t: {
    [key: string]: string;
  };
}

export function ProfileSteps({ currentStep, t }: ProfileStepsProps) {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
        {steps.map((step, stepIdx) => (
          <li key={step.id} className="md:flex-1">
            <div
              className={cn(
                'group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4',
                step.id === currentStep
                  ? 'border-primary'
                  : stepIdx < steps.findIndex((s) => s.id === currentStep)
                  ? 'border-primary'
                  : 'border-muted-foreground/25'
              )}
            >
              <span className="text-sm font-medium">
                {stepIdx + 1}. {t[step.name]}
              </span>
              <span className="text-sm">
                {stepIdx < steps.findIndex((s) => s.id === currentStep) && (
                  <Check className="ml-1.5 h-4 w-4 text-primary inline-block" />
                )}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
} 