'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useToast } from './ui/use-toast'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { CreateSite } from '@/utils/types'
import { fetchSingleSite, updateSiteAction } from '@/utils/actions'
import { Form, FormLabel } from './ui/form'
import { CustomFormField } from './FormComponents'
import { Checkbox } from './ui/checkbox'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { CalendarRaw } from './Calendar-raw'

const EditSite = () => {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<CreateSite>()

  const { data, isLoading, error } = useQuery({
    queryKey: ['singleSite', id],
    queryFn: () => fetchSingleSite(String(id)),
    enabled: !!id,
  })

  const [date, setDate] = useState<Date | undefined>(
    data?.buildStart ? new Date(data.buildStart) : undefined
  )

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateSite) => updateSiteAction(String(id), values),
    onSuccess: (data) => {
      if (!data) {
        toast({ description: 'there was an error' })
        return
      }
      toast({ description: 'site updated' })
      queryClient.invalidateQueries({ queryKey: ['sites'] })
      queryClient.invalidateQueries({ queryKey: ['singleSite', id] })

      router.push(`/sites/${id}`)
    },
  })

  useEffect(() => {
    if (data) {
      form.reset({
        owners: data.owners,
        jobReference: data.jobReference,
        siteAddress: data.siteAddress,
        buildComplete: data.buildComplete,
        buildStart: data.buildStart,
      })
    }
  }, [data, form])

  const onSubmit = (values: CreateSite) => {
    if (date) {
    }

    const validValues: CreateSite = {
      jobReference: values.jobReference,
      owners: values.owners,
      siteAddress: values.siteAddress,
      buildComplete: values.buildComplete,
      buildStart: date ? date.toISOString() : values.buildStart,
    }
    mutate(validValues)
  }

  const buildComplete = form.watch('buildComplete')

  if (isLoading) {
    return <h1 className="text-center text-black text-4xl">Loading...</h1>
  }
  if (error) {
    return (
      <h1 className="text-center text-black text-4xl">
        Failed to load site data
      </h1>
    )
  }

  return (
    <Form {...form}>
      <h2 className="capitalize font-semibold text-primary text-4xl mb-6 flex justify-center items-center">
        Update Site
      </h2>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-8 rounded flex flex-col justify-center items-center"
      >
        <div className="flex flex-col w-1/3 items-center justify-center space-y-4">
          <div className="w-full flex flex-col items-start space-y-2">
            <FormLabel className="text-left">Job Reference</FormLabel>
            <CustomFormField name="jobReference" control={form.control} />
          </div>
          <div className="w-full flex flex-col items-start space-y-2">
            <FormLabel className="text-left">Owners</FormLabel>
            <CustomFormField name="owners" control={form.control} />
          </div>
          <div className="w-full flex flex-col items-start space-y-2">
            <FormLabel className="text-left">Site Address</FormLabel>
            <CustomFormField name="siteAddress" control={form.control} />
          </div>
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
                {date
                  ? format(date, 'PPP')
                  : data?.buildStart
                  ? format(new Date(data.buildStart), 'PPP')
                  : 'Build Start'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarRaw
                mode="single"
                captionLayout="dropdown-buttons"
                selected={date}
                onSelect={setDate}
                fromYear={2000}
                toYear={2050}
                defaultMonth={
                  data?.buildStart ? new Date(data.buildStart) : undefined
                }
              />
            </PopoverContent>
          </Popover>

          <div className="mt-4">
            <Button
              type="submit"
              className="capitalize mt-4"
              disabled={isPending}
            >
              {isPending ? 'loading' : 'update site'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default EditSite
