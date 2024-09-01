'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useToast } from './ui/use-toast'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { CreateProduct } from '@/utils/types'
import { createInteriorProduct, createExteriorProduct } from '@/utils/actions'
import { Form, FormLabel } from './ui/form'
import { CustomFormField } from './FormComponents'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Calendar } from './ui/calendar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { categories } from '@/utils/categories'
import { CalendarRaw } from './Calendar-raw'

type CreateProductFormProps = {
  type: 'interior' | 'exterior'
}

const CreateProductForm: React.FC<CreateProductFormProps> = ({ type }) => {
  const params = useParams()
  const id = params.id
  const queryClient = useQueryClient()
  const [date, setDate] = useState<Date>()
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<CreateProduct>({
    defaultValues: {
      name: '',
      supplier: '',
      category: '',
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

  const mutationFn =
    type === 'interior' ? createInteriorProduct : createExteriorProduct

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateProduct) => mutationFn(values, String(id)),
    onSuccess: (data) => {
      if (!data) {
        toast({ description: 'There was an error' })
        return
      }
      toast({
        description: `${
          type.charAt(0).toUpperCase() + type.slice(1)
        } product created`,
      })
      queryClient.invalidateQueries({ queryKey: [`${type}Products`, id] })

      router.push(`/sites/${id}/${type}`)
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
    }

    const validValues: CreateProduct = {
      name: values.name,
      supplier: values.supplier,
      category: values.category,
      maintenanceInstructions: values.maintenanceInstructions,
      installers: values.installers,
    }
    mutate(validValues)
  }

  return (
    <Form {...form}>
      <h2 className="capitalize font-semibold text-primary text-4xl mb-6 flex justify-center items-center">
        Add {type} Product
      </h2>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-8 rounded flex flex-col justify-center items-center"
      >
        <div className="flex flex-col w-1/3 items-center justify-center space-y-4">
          <div className="w-full flex flex-col items-start space-y-2">
            <FormLabel className="text-left">Product Name</FormLabel>
            <CustomFormField name="name" control={form.control} />
          </div>
          <div className="w-full flex flex-col items-start space-y-2">
            <FormLabel className="text-left">Supplier</FormLabel>
            <CustomFormField name="supplier" control={form.control} />
          </div>
          <div className="w-full flex flex-col items-start space-y-2">
            <FormLabel className="text-left">Category</FormLabel>
            <Select
              onValueChange={(value) => form.setValue('category', value)}
              value={form.watch('category')}
              defaultValue={form.getValues('category')}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories[type].map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="border-t-2 w-full">
            <h2 className="pt-2 flex justify-center ">
              Maintenance Instructions
            </h2>
          </div>
          <div className="w-full flex flex-col items-start space-y-2">
            <FormLabel className="text-left capitalize">
              Action required
            </FormLabel>
            <CustomFormField
              name="maintenanceInstructions.0.actionRequired"
              control={form.control}
            />
          </div>
          <div className="w-full flex flex-col items-start space-y-2">
            <FormLabel className="text-left">Frequency</FormLabel>
            <CustomFormField
              name="maintenanceInstructions.0.frequency"
              control={form.control}
            />
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
                {date ? format(date, 'PPP') : <span>Next Maintenance Due</span>}
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
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <div className="border-t-2 w-full">
            <h2 className="pt-2 flex justify-center ">Installer</h2>
          </div>
          <div className="w-full flex flex-col items-start space-y-2">
            <FormLabel className="text-left">Installer Name</FormLabel>
            <CustomFormField name="installers.0.name" control={form.control} />
          </div>
          <div className="w-full flex flex-col items-start space-y-2">
            <FormLabel className="text-left">
              Installer Contact - Email or Phone
            </FormLabel>
            <CustomFormField
              name="installers.0.contact"
              control={form.control}
            />
          </div>
          <div className="mt-4">
            <Button
              type="submit"
              className="capitalize mt-4"
              disabled={isPending}
            >
              {isPending ? 'loading' : 'create product'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default CreateProductForm
