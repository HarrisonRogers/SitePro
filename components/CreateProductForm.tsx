'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useToast } from './ui/use-toast'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { CreateProduct } from '@/utils/types'
import { createInteriorProductAction } from '@/utils/actions'
import { Form } from './ui/form'
import { CustomFormField } from './FormComponents'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Calendar } from './ui/calendar'

const CreateProductForm = () => {
  const params = useParams()
  const { siteId } = params
  const queryClient = useQueryClient()
  const [date, setDate] = useState<Date>()
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<CreateProduct>({
    defaultValues: {
      name: '',
      supplier: '',
      maintenanceInstructions: [
        {
          actionRequired: '',
          frequency: '',
          dueOn: '',
        },
      ],
      installers: [
        {
          name: '',
          contact: '',
        },
      ],
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateProduct) =>
      createInteriorProductAction(values, String(siteId)),
    onSuccess: (data) => {
      if (!data) {
        toast({ description: 'there was an error' })
        return
      }
      toast({ description: 'Interior product created' })
      queryClient.invalidateQueries({ queryKey: ['interiorProducts', siteId] })

      router.push(`/sites/${siteId}/interior-product`)
    },
  })

  const onSubmit = (values: CreateProduct) => {
    if (date) {
      values.maintenanceInstructions = values.maintenanceInstructions.map(
        (instruction) => ({
          ...instruction,
          dueOn: date.toISOString(),
        })
      )

      const validValues: CreateProduct = {
        name: values.name,
        supplier: values.supplier,
        maintenanceInstructions: values.maintenanceInstructions,
        installers: values.installers,
      }
      mutate(validValues)
    }

    // const buildComplete = form.watch('buildComplete')

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

            {/* Build start */}
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
}
export default CreateProductForm
