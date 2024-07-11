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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-primary p-8 rounded flex flex-col justify-center items-center"
      >
        <h2 className="capitalize font-semibold text-white text-4xl mb-6">
          Add Site
        </h2>
        <div className="flex flex-col w-1/3 items-center justify-center space-y-4">
          {/* Reference */}
          <CustomFormField name="jobReference" control={form.control} />
          {/* Owners */}
          <CustomFormField name="owners" control={form.control} />
          {/* Site address */}
          <CustomFormField name="siteAddress" control={form.control} />
          {/* Build complete */}
          <div
            className="flex items-center space-x-2"
            style={{ margin: '2rem 0 1.5rem 0' }}
          >
            <Checkbox id="buildComplete" className="border-white" />
            <label
              htmlFor="buildComplete"
              className="text-sm font-medium text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Is complete
            </label>
            {/* Build start */}
          </div>
          <label className=" text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize text-white">
            Build Start
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={`w-[280px] justify-start text-left font-normal ${
                  !date ? 'text-muted-foreground' : ''
                }`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : <span>Pick a date</span>}
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
          <div>
            <Button
              type="submit"
              variant={'secondary'}
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
