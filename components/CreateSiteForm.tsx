'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useToast } from './ui/use-toast'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { CreateSite } from '@/utils/types'
import { createSiteAction } from '@/utils/actions'
import { Form } from './ui/form'
import { CustomFormField, CustomFormSelect } from './FormComponents'
import { Checkbox } from './ui/checkbox'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Calendar } from './ui/calendar'

const CreateSiteForm = () => {
  const queryClient = useQueryClient()
  const [date, setDate] = useState<Date>()
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<CreateSite>({
    defaultValues: {
      jobReference: '',
      owners: '',
      siteAddress: '',
      buildComplete: false,
      buildStart: '',
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateSite) => createSiteAction(values),
    onSuccess: (data) => {
      if (!data) {
        toast({ description: 'there was an error' })
        return
      }
      toast({ description: 'job created' })
      queryClient.invalidateQueries({ queryKey: ['sites'] })

      router.push('/sites')
    },
  })

  const onSubmit = (values: CreateSite) => {
    if (date) {
      values.buildStart = date.toISOString()
    }

    const validValues: CreateSite = {
      jobReference: values.jobReference,
      owners: values.owners,
      siteAddress: values.siteAddress,
      buildComplete: values.buildComplete,
      buildStart: values.buildStart,
    }
    mutate(validValues)
  }

  const buildComplete = form.watch('buildComplete')

  return (
    <Form {...form}>
      <h2 className="capitalize font-semibold text-primary text-4xl mb-6 flex justify-center items-center">
        Add Site
      </h2>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-8 rounded flex flex-col justify-center items-center"
      >
        <div className="flex flex-col w-1/3 items-center justify-center space-y-4">
          {/* Reference */}
          <CustomFormField name="jobReference" control={form.control} />
          {/* Owners */}
          <CustomFormField name="owners" control={form.control} />
          {/* Site address */}
          <CustomFormField name="siteAddress" control={form.control} />
          {/* Build complete */}
          <div
            className="flex items-center space-x-2 my-4"
            style={{ margin: '2rem 0 1.5rem 0' }}
          >
            <Checkbox
              id="buildComplete"
              {...form.register('buildComplete')}
              onCheckedChange={(checked) =>
                form.setValue('buildComplete', Boolean(checked))
              }
              checked={buildComplete}
            />
            <label
              htmlFor="buildComplete"
              className="text-sm font-medium text-primary leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Is complete
            </label>
            {/* Build start */}
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={`w-[280px] justify-start text-left font-normal mt-0 ${
                  !date ? 'text-muted-foreground' : ''
                }`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : <span>Build Start</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <div className="mt-4">
            <Button
              type="submit"
              className="capitalize mt-4"
              disabled={isPending}
            >
              {isPending ? 'loading' : 'create site'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default CreateSiteForm
