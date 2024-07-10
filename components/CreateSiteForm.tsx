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

const CreateSiteForm = () => {
  const queryClient = useQueryClient()
  // const [formValues, setFormValues] = useState()
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
    mutate(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-primary p-8 rounded text-white"
      >
        <h2 className="capitalize font-semibold text-4xl mb-6">Add Site</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
          {/* Refernce */}
          <CustomFormField name="Job reference" control={form.control} />
          {/* owners */}
          <CustomFormField name="Owners" control={form.control} />
          {/* Site address */}
          <CustomFormField name="Site Address" control={form.control} />
          {/* Build start */}
          {/* Needs complete */}

          {/* build complete */}
          <div className="flex items-center space-x-2">
            <Checkbox id="complete" className="border-white" />
            <label
              htmlFor="complete"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Is complete
            </label>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default CreateSiteForm
