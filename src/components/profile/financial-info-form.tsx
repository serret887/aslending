'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'react-hot-toast';

const financialInfoSchema = z.object({
  annualIncome: z.string().min(1, 'Annual income is required'),
  employmentStatus: z.string().min(1, 'Employment status is required'),
  employerName: z.string().min(1, 'Employer name is required'),
  employmentLength: z.string().min(1, 'Employment length is required'),
  creditScore: z.string().min(1, 'Credit score is required'),
  monthlyDebt: z.string().min(1, 'Monthly debt is required'),
});

type FinancialInfoValues = z.infer<typeof financialInfoSchema>;

interface FinancialInfoFormProps {
  t: {
    annualIncome: string;
    employmentStatus: string;
    employerName: string;
    employmentLength: string;
    creditScore: string;
    monthlyDebt: string;
    next: string;
    saving: string;
    back: string;
    employed: string;
    selfEmployed: string;
    unemployed: string;
    retired: string;
  };
  locale: string;
}

export function FinancialInfoForm({ t, locale }: FinancialInfoFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<FinancialInfoValues>({
    resolver: zodResolver(financialInfoSchema),
    defaultValues: {
      annualIncome: '',
      employmentStatus: '',
      employerName: '',
      employmentLength: '',
      creditScore: '',
      monthlyDebt: '',
    },
  });

  async function onSubmit(data: FinancialInfoValues) {
    setIsLoading(true);
    try {
      // TODO: Save financial info to Supabase
      router.push(`/${locale}/profile/create/documents`);
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="annualIncome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.annualIncome}</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="employmentStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.employmentStatus}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employment status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="employed">{t.employed}</SelectItem>
                  <SelectItem value="self-employed">{t.selfEmployed}</SelectItem>
                  <SelectItem value="unemployed">{t.unemployed}</SelectItem>
                  <SelectItem value="retired">{t.retired}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="employerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.employerName}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="employmentLength"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.employmentLength}</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="creditScore"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.creditScore}</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="monthlyDebt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.monthlyDebt}</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => router.push(`/${locale}/profile/create/personal`)}
          >
            {t.back}
          </Button>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? t.saving : t.next}
          </Button>
        </div>
      </form>
    </Form>
  );
} 