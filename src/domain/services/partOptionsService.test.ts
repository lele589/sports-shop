import { partOptionsService } from './partOptionsService';

describe('partOptionsService', () => {
  describe('identifyDisallowedOptions', () => {
    it('should identify multiple disallowed options from a single dependency', () => {
      const selectedOptions = { 1: 1 };
      const dependencies = [{ optionId: 1, disallowedOptionId: 4 }];

      const result = partOptionsService.identifyDisallowedOptions({
        selectedOptions,
        dependencies,
      });
      expect(result).toEqual([4]);
    });

    it('should identify disallowed options from multiple dependencies', () => {
      const selectedOptions = { 1: 1, 2: 2 };
      const dependencies = [
        { optionId: 1, disallowedOptionId: 4 },
        { optionId: 2, disallowedOptionId: 5 },
      ];

      const result = partOptionsService.identifyDisallowedOptions({
        selectedOptions,
        dependencies,
      });
      expect(result).toEqual([4, 5]);
    });

    it('should NOT identify disallowed options when options selected not have dependencies', () => {
      const selectedOptions = { 1: 1 };
      const dependencies = [{ optionId: 2, disallowedOptionId: 4 }];

      const result = partOptionsService.identifyDisallowedOptions({
        selectedOptions,
        dependencies,
      });
      expect(result).toEqual([]);
    });

    it('should NOT identify disallowed options when no options are selected', () => {
      const selectedOptions = {};
      const dependencies = [{ optionId: 1, disallowedOptionId: 4 }];

      const result = partOptionsService.identifyDisallowedOptions({
        selectedOptions,
        dependencies,
      });
      expect(result).toEqual([]);
    });
  });

  describe('filterSelectedOptions', () => {
    it('should remove disallowed options from selected options', () => {
      const selectedOptions = { 1: 1, 2: 2 };
      const disallowedOptions = [1];

      const result = partOptionsService.filterSelectedOptions({
        selectedOptions,
        disallowedOptions,
      });
      expect(result).toEqual({ 2: 2 });
    });

    it('should NOT remove any options when no disallowed options are present', () => {
      const selectedOptions = { 1: 1, 2: 2 };
      const disallowedOptions: number[] = [];

      const result = partOptionsService.filterSelectedOptions({
        selectedOptions,
        disallowedOptions,
      });
      expect(result).toEqual(selectedOptions);
    });
  });
});
