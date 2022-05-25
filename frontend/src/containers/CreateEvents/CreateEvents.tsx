import React, { useRef } from 'react';

import clsx from 'clsx';
import { Formik, Form, Field } from 'formik';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import { useCreateEvent } from '@/api/createEvent';
import { useNFTS } from '@/api/getNFTS';
import { DatePickerField } from '@/components/DatePickerField/DatePickerField';
import { NFTPreview } from '@/components/NFTPreview/NFTPreview';
import { Spinner } from '@/components/Spinner/Spinner';
import { useAuth } from '@/layout/useAuth';

interface CreateEventForm {
  name: string;
  description: string;
  startsAt: string;
  endsAt: string;
  nft: {
    contractAddress: string;
    contractType: string;
    name: string;
    image: string;
    tokenId: string;
  };
}

export const CreateEvents = () => {
  const formikRef = useRef<any>();

  const router = useRouter();

  const { isLoggedIn, isLoading, account, handleConnect } = useAuth();

  const { mutateAsync: createEventAPI, isLoading: isLoadingCreateEvent } =
    useCreateEvent();
  const { data: nftsData, isLoading: isLoadingNFTs } = useNFTS({
    address: account,
    enabled: isLoggedIn,
  });

  const handleSelectNFT = (nft: NFT) => {
    if (!formikRef.current) return;

    formikRef.current.setFieldValue('nft', {
      contractAddress: nft.token_address,
      contractType: nft.contract_type,
      name: nft.name,
      image: nft.image,
      tokenId: nft.token_id,
    });
  };

  const handleCreateEvent = async (values: CreateEventForm) => {
    try {
      const result = await createEventAPI(values);

      if (result.status === 200) {
        toast.success('created an event');
        router.push('/');
      }
    } catch (error) {
      toast.error('something went wrong');
    }
  };

  if (isLoadingNFTs) {
    return (
      <div className="grid w-screen h-screen place-items-center">
        <Spinner />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="grid w-screen h-screen place-items-center">
        <button
          onClick={handleConnect}
          className={clsx(
            'border-red-400 border group w-[250px] whitespace-nowrap flex gap-2 items-center justify-center text-red-400  px-8 py-4 rounded-sm hover:text-white transition-colors hover:bg-red-400 text-xl font-bold'
          )}
        >
          {isLoading ? (
            <Spinner />
          ) : (
            <span className="overflow-hidden overflow-ellipsis">
              Connect Wallet
            </span>
          )}
        </button>
      </div>
    );
  }

  if (!nftsData?.data?.nft?.length) {
    return (
      <div className="grid w-screen h-screen place-items-center">
        <div className="text-center">
          <h4 className="text-lg font-semibold">You do not own any NFTS.</h4>
          <p>NFT is required for token-gating the stream event</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 w-full max-w-4xl px-2 mx-auto">
      <div className="mt-12">
        <Formik<CreateEventForm>
          initialValues={{
            name: '',
            description: '',
            startsAt: '',
            endsAt: '',
            nft: {
              contractAddress: '',
              contractType: '',
              image: '',
              name: '',
              tokenId: '',
            },
          }}
          onSubmit={handleCreateEvent}
          innerRef={formikRef}
        >
          {({ handleChange, handleBlur, values }) => (
            <Form>
              <header className="flex items-center justify-between w-full my-12">
                <h4 className="text-2xl font-bold text-gray-700/80">
                  Create an Event
                </h4>

                <div>
                  <button
                    type="submit"
                    disabled={isLoadingCreateEvent}
                    className={clsx(
                      'bg-red-400 border-red-400 border ml-auto group w-[250px] whitespace-nowrap flex items-center justify-center px-8 py-2 rounded-sm hover:text-red-400 text-white transition-colors hover:bg-white text-xl font-bold'
                    )}
                  >
                    Save
                  </button>
                </div>
              </header>

              <div className="flex flex-col w-full gap-8 pb-28">
                <div className="grid grid-cols-2 gap-8">
                  <div className="flex flex-col gap-8">
                    <label className="flex flex-col gap-2">
                      <span className="font-semibold">Event Name</span>
                      <Field
                        className="px-4 py-2 border border-gray-900 rounded-sm"
                        type="text"
                        name="name"
                      />
                    </label>

                    <label className="flex flex-col gap-2">
                      <span className="font-semibold">Event Description</span>
                      <textarea
                        rows={8}
                        name="description"
                        className="px-4 py-2 border border-gray-900 rounded-sm"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </label>
                  </div>

                  <div className="flex flex-col gap-8">
                    <label className="flex flex-col gap-2">
                      <span className="font-semibold">Start Date</span>
                      <DatePickerField name="startsAt" />
                    </label>

                    <label className="flex flex-col gap-2">
                      <span className="font-semibold">End Date</span>
                      <DatePickerField name="endsAt" />
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold">
                    Select NFT for Token Gating
                  </h4>

                  <div className="flex flex-wrap gap-4 mt-4">
                    {nftsData?.data?.nft?.map((nft) => (
                      <NFTPreview
                        key={`${nft.token_address}-${nft.token_id}`}
                        handleSelectNFT={handleSelectNFT}
                        nft={nft}
                        isSelected={
                          values.nft.contractAddress === nft.token_address &&
                          values.nft.tokenId === nft.token_id
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
