'use client'
import { editProductAction, getProductAction } from '@/utils/actions'
import { CreateProduct } from '@/utils/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { Form, FormLabel } from './ui/form'
import { CustomFormField } from './FormComponents'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { CalendarIcon, Calendar } from 'lucide-react'
import { format } from 'path'
import { useToast } from './ui/use-toast'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

const EditProduct = ({ type }: { type: string }) => {
  const { id, productId } = useParams()

  const { data, isLoading, error } = useQuery<CreateProduct>({
    queryKey: [`${type}Product`, productId],
    queryFn: () => getProductAction(String(id), String(productId)),
    enabled: !!productId,
  })

  const [date, setDate] = useState<Date>()
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<CreateProduct>({
    defaultValues: {
      name: data?.name,
      supplier: data?.supplier,
      maintenanceInstructions:
        data?.maintenanceInstructions.map((instruction) => ({
          actionRequired: instruction.actionRequired,
          frequency: instruction.frequency,
          dueOn: instruction.dueOn,
        })) || [],
      installers:
        data?.installers.map((installer) => ({
          name: installer.name,
          contact: installer.contact,
        })) || [],
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateProduct) =>
      editProductAction(String(id), String(productId), values),
    onSuccess: (data) => {
      if (!data) {
        toast({ description: 'There was an error' })
        return
      }
      toast({
        description: `${
          type.charAt(0).toUpperCase() + type.slice(1)
        } product updated`,
      })
      queryClient.invalidateQueries({ queryKey: [`${type}Product`, productId] })

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

    mutate(values)
  }

  return (
    <Form {...form}>
      <h2 className="capitalize font-semibold text-primary text-4xl mb-6 flex justify-center items-center">
        Edit {data?.name} {`${type.charAt(0).toUpperCase() + type.slice(1)}`}{' '}
        product
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
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
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

export default EditProduct
