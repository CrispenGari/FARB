import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AskBotInput = {
  message: Scalars['String'];
};

export type AskBotResponse = {
  __typename?: 'AskBotResponse';
  error?: Maybe<Error>;
  prediction?: Maybe<BotPrediction>;
  response?: Maybe<BotResponse>;
  success: Scalars['Boolean'];
};

export type BotPrediction = {
  __typename?: 'BotPrediction';
  confidence: Scalars['Float'];
  pattern: Scalars['String'];
  tag: Scalars['String'];
  tagId: Scalars['Int'];
};

export type BotResponse = {
  __typename?: 'BotResponse';
  message: Scalars['String'];
};

export type Error = {
  __typename?: 'Error';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Meta = {
  __typename?: 'Meta';
  description: Scalars['String'];
  language: Scalars['String'];
  libraries: Array<Scalars['String']>;
  main: Scalars['String'];
  programmer: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  askBot: AskBotResponse;
};


export type MutationAskBotArgs = {
  input: AskBotInput;
};

export type Query = {
  __typename?: 'Query';
  meta: Meta;
};

export type AskBotResponseFragment = { __typename?: 'AskBotResponse', success: boolean, error?: { __typename?: 'Error', field: string, message: string } | null, response?: { __typename?: 'BotResponse', message: string } | null, prediction?: { __typename?: 'BotPrediction', confidence: number, tag: string, tagId: number, pattern: string } | null };

export type BotPredictionFragmentFragment = { __typename?: 'BotPrediction', confidence: number, tag: string, tagId: number, pattern: string };

export type BotResponseFragmentFragment = { __typename?: 'BotResponse', message: string };

export type ErrorFragmentFragment = { __typename?: 'Error', field: string, message: string };

export type AskBotMutationVariables = Exact<{
  input: AskBotInput;
}>;


export type AskBotMutation = { __typename?: 'Mutation', askBot: { __typename?: 'AskBotResponse', success: boolean, error?: { __typename?: 'Error', field: string, message: string } | null, response?: { __typename?: 'BotResponse', message: string } | null, prediction?: { __typename?: 'BotPrediction', confidence: number, tag: string, tagId: number, pattern: string } | null } };

export const ErrorFragmentFragmentDoc = gql`
    fragment ErrorFragment on Error {
  field
  message
}
    `;
export const BotResponseFragmentFragmentDoc = gql`
    fragment BotResponseFragment on BotResponse {
  message
}
    `;
export const BotPredictionFragmentFragmentDoc = gql`
    fragment BotPredictionFragment on BotPrediction {
  confidence
  tag
  tagId
  pattern
}
    `;
export const AskBotResponseFragmentDoc = gql`
    fragment AskBotResponse on AskBotResponse {
  error {
    ...ErrorFragment
  }
  success
  response {
    ...BotResponseFragment
  }
  prediction {
    ...BotPredictionFragment
  }
}
    ${ErrorFragmentFragmentDoc}
${BotResponseFragmentFragmentDoc}
${BotPredictionFragmentFragmentDoc}`;
export const AskBotDocument = gql`
    mutation AskBot($input: AskBotInput!) {
  askBot(input: $input) {
    ...AskBotResponse
  }
}
    ${AskBotResponseFragmentDoc}`;
export type AskBotMutationFn = Apollo.MutationFunction<AskBotMutation, AskBotMutationVariables>;

/**
 * __useAskBotMutation__
 *
 * To run a mutation, you first call `useAskBotMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAskBotMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [askBotMutation, { data, loading, error }] = useAskBotMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAskBotMutation(baseOptions?: Apollo.MutationHookOptions<AskBotMutation, AskBotMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AskBotMutation, AskBotMutationVariables>(AskBotDocument, options);
      }
export type AskBotMutationHookResult = ReturnType<typeof useAskBotMutation>;
export type AskBotMutationResult = Apollo.MutationResult<AskBotMutation>;
export type AskBotMutationOptions = Apollo.BaseMutationOptions<AskBotMutation, AskBotMutationVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    