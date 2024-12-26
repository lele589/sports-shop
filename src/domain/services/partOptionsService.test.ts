import { partOptionsService } from './partOptionsService';

describe('partOptionsService', () => {
  describe('identifyDisallowedOptions', () => {
    it('should identify multiple disallowed options from a single dependency', () => {
      const selectedOptions = { 'part-1': 'option-1' };
      const dependencies = [
        { optionId: 'option-1', disallowedOptionIds: ['option-4', 'option-5'] },
      ];

      const result = partOptionsService.identifyDisallowedOptions({
        selectedOptions,
        dependencies,
      });
      expect(result).toEqual(['option-4', 'option-5']);
    });

    it('should identify disallowed options from multiple dependencies', () => {
      const selectedOptions = { 'part-1': 'option-1', 'part-2': 'option-2' };
      const dependencies = [
        { optionId: 'option-1', disallowedOptionIds: ['option-4'] },
        { optionId: 'option-2', disallowedOptionIds: ['option-5'] },
      ];

      const result = partOptionsService.identifyDisallowedOptions({
        selectedOptions,
        dependencies,
      });
      expect(result).toEqual(['option-4', 'option-5']);
    });

    it('should NOT identify disallowed options when options selected not have dependencies', () => {
      const selectedOptions = { 'part-1': 'option-1' };
      const dependencies = [{ optionId: 'option-2', disallowedOptionIds: ['option-4'] }];

      const result = partOptionsService.identifyDisallowedOptions({
        selectedOptions,
        dependencies,
      });
      expect(result).toEqual([]);
    });

    it('should NOT identify disallowed options when no options are selected', () => {
      const selectedOptions = {};
      const dependencies = [{ optionId: 'option-1', disallowedOptionIds: ['option-4'] }];

      const result = partOptionsService.identifyDisallowedOptions({
        selectedOptions,
        dependencies,
      });
      expect(result).toEqual([]);
    });
  });

  describe('filterSelectedOptions', () => {
    it('should remove disallowed options from selected options', () => {
      const selectedOptions = { 'part-1': 'option-1', 'part-2': 'option-2' };
      const disallowedOptions = ['option-1'];

      const result = partOptionsService.filterSelectedOptions({
        selectedOptions,
        disallowedOptions,
      });
      expect(result).toEqual({ 'part-2': 'option-2' });
    });

    it('should NOT remove any options when no disallowed options are present', () => {
      const selectedOptions = { 'part-1': 'option-1', 'part-2': 'option-2' };
      const disallowedOptions: string[] = [];

      const result = partOptionsService.filterSelectedOptions({
        selectedOptions,
        disallowedOptions,
      });
      expect(result).toEqual(selectedOptions);
    });
  });
});
