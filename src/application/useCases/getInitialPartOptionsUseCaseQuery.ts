import { partOptionsService } from '../../domain/services/partOptionsService';
import { GENERIC_USE_CASE_ERRORS } from './useCasesErrorConstants';
import { Part } from '../../domain/entities/Product';
import { ResultType } from '../../types/Generics';

type GetInitialPartOptionsUseCaseQueryTypes = ({
  partOptions,
}: {
  partOptions: Part[];
}) => ResultType<{ [partId: string]: string }>;

export const GetInitialPartOptionsUseCaseQuery: GetInitialPartOptionsUseCaseQueryTypes = ({
  partOptions,
}: {
  partOptions: Part[];
}) => {
  const scope = '[USE_CASE/GET_INITIAL_PART_OPTIONS]';
  try {
    const initialPartOptions = partOptionsService.getInitialPartOptions({
      partOptions,
    });

    return {
      success: true,
      data: initialPartOptions,
    };
  } catch {
    const errorMessage = 'Unexpected error';
    return {
      success: false,
      error: {
        type: GENERIC_USE_CASE_ERRORS.UNEXPECTED,
        message: `${scope} ${errorMessage}`,
      },
    };
  }
};
