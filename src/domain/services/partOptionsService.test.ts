import { partOptionsService } from './partOptionsService';

describe('partOptionsService', () => {
  describe('getDisallowedOptions', () => {
    test('should identify multiple disallowed options from a single dependency', () => {
      const selectedOptions = { 'part-1': 'option-1' };
      const dependencies = [
        { optionId: 'option-1', disallowedOptionIds: ['option-4', 'option-5'] },
      ];

      const result = partOptionsService.getDisallowedOptions({ selectedOptions, dependencies });
      expect(result).toEqual(['option-4', 'option-5']);
    });

    test('should identify disallowed options from multiple dependencies', () => {
      const selectedOptions = { 'part-1': 'option-1', 'part-2': 'option-2' };
      const dependencies = [
        { optionId: 'option-1', disallowedOptionIds: ['option-4'] },
        { optionId: 'option-2', disallowedOptionIds: ['option-5'] },
      ];

      const result = partOptionsService.getDisallowedOptions({ selectedOptions, dependencies });
      expect(result).toEqual(['option-4', 'option-5']);
    });

    test('should NOT identify disallowed options when options selected not have dependencies', () => {
      const selectedOptions = { 'part-1': 'option-1' };
      const dependencies = [{ optionId: 'option-2', disallowedOptionIds: ['option-4'] }];

      const result = partOptionsService.getDisallowedOptions({ selectedOptions, dependencies });
      expect(result).toEqual([]);
    });

    test('should NOT identify disallowed options when no options are selected', () => {
      const selectedOptions = {};
      const dependencies = [{ optionId: 'option-1', disallowedOptionIds: ['option-4'] }];

      const result = partOptionsService.getDisallowedOptions({ selectedOptions, dependencies });
      expect(result).toEqual([]);
    });
  });
});
