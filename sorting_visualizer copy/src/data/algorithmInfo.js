export const algorithmInfo = {
  'Bubble Sort': {
    description: 'Bubble Sort is a simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The algorithm gets its name from the way smaller elements "bubble" to the top of the list.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    stable: true,
    advantages: [
      'Simple implementation',
      'Efficient for small datasets',
      'Stable sorting algorithm',
      'In-place sorting (requires no extra space)',
      'Adaptive (performs well on nearly sorted data)'
    ],
    disadvantages: [
      'Inefficient for large datasets',
      'Poor performance compared to other algorithms',
      'Requires many swaps',
      'Not suitable for real-world applications with large data'
    ],
    link: 'https://www.geeksforgeeks.org/bubble-sort/',
    procedure: [
      'Start from the first element',
      'Compare adjacent elements',
      'Swap if they are in wrong order',
      'Move to next pair',
      'Repeat until no swaps needed'
    ],
    stepDetails: [
      'Initialize the algorithm by starting at the first element of the array.',
      'Compare the current element with the next element in the array.',
      'If the current element is greater than the next element, swap them to maintain ascending order.',
      'Move to the next pair of elements and repeat the comparison.',
      'Continue this process until no more swaps are needed, indicating the array is sorted.'
    ],
    implementationNotes: [
      'Uses two nested loops for comparison and swapping',
      'Outer loop runs n-1 times',
      'Inner loop runs n-i-1 times where i is the outer loop counter',
      'Optimization: can stop if no swaps occur in a pass'
    ],
    code: {
      // ... existing code ...
    }
  },
  'Selection Sort': {
    description: 'Selection Sort is a simple comparison-based algorithm that divides the input into a sorted and unsorted region, and repeatedly selects the smallest element from the unsorted region to add to the sorted region.',
    timeComplexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    stable: false,
    advantages: [
      'Simple implementation',
      'Performs well on small lists',
      'Minimizes number of swaps',
      'In-place sorting algorithm',
      'Performs well on systems with limited memory'
    ],
    disadvantages: [
      'Inefficient for large datasets',
      'Not stable (may change order of equal elements)',
      'Always performs O(n²) comparisons',
      'Poor performance on nearly sorted data'
    ],
    link: 'https://www.geeksforgeeks.org/selection-sort/',
    procedure: [
      'Find minimum element in unsorted array',
      'Swap with first element of unsorted array',
      'Move boundary of unsorted array one element right',
      'Repeat until array is sorted'
    ],
    stepDetails: [
      'Scan the entire array to find the minimum element in the unsorted portion.',
      'Swap this minimum element with the first element of the unsorted portion.',
      'Move the boundary between sorted and unsorted portions one element to the right.',
      'Repeat the process for the remaining unsorted portion until the entire array is sorted.'
    ],
    implementationNotes: [
      'Uses two nested loops',
      'Outer loop selects position for next minimum',
      'Inner loop finds minimum in unsorted portion',
      'Performs exactly n-1 swaps'
    ],
    code: {
      // ... existing code ...
    }
  },
  'Insertion Sort': {
    description: 'Insertion Sort is a simple comparison-based algorithm that builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    stable: true,
    advantages: [
      'Simple implementation',
      'Efficient for small datasets',
      'Adaptive (efficient for partially sorted arrays)',
      'Stable sorting algorithm',
      'In-place sorting algorithm',
      'Online algorithm (can sort as it receives data)'
    ],
    disadvantages: [
      'Inefficient for large datasets',
      'Requires shifting elements which can be expensive',
      'Poor performance on reverse-sorted arrays',
      'Not suitable for real-time applications'
    ],
    link: 'https://www.geeksforgeeks.org/insertion-sort/',
    procedure: [
      'Start from the second element (index 1)',
      'Compare it with the previous elements',
      'If the previous element is greater, move it one position ahead',
      'Continue this process until the correct position for the current element is found',
      'Repeat for all elements in the array'
    ],
    stepDetails: [
      'Begin with the second element, considering the first element as a sorted subarray.',
      'Compare the current element with each element in the sorted subarray.',
      'Shift elements in the sorted subarray that are greater than the current element one position ahead.',
      'Insert the current element into its correct position in the sorted subarray.',
      'Repeat the process for each element in the array until the entire array is sorted.'
    ],
    implementationNotes: [
      'Uses a single loop with a nested while loop',
      'Efficient for small or nearly sorted data',
      'Performs well in practice for small arrays',
      'Can be used as a building block for more complex algorithms'
    ],
    code: {
      // ... existing code ...
    }
  },
  'Merge Sort': {
    description: 'Merge Sort is an efficient, stable, comparison-based, divide and conquer sorting algorithm. It works by recursively breaking down a problem into two or more sub-problems of the same or related type, until these become simple enough to be solved directly.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(n)',
    stable: true,
    advantages: [
      'Guaranteed O(n log n) time complexity',
      'Stable sorting algorithm',
      'Works well on linked lists and large datasets',
      'Good for external sorting',
      'Predictable performance',
      'Suitable for parallel processing'
    ],
    disadvantages: [
      'Requires extra memory proportional to input size',
      'Slower than some algorithms for small datasets',
      'Not in-place sorting algorithm',
      'Additional space complexity'
    ],
    link: 'https://www.geeksforgeeks.org/merge-sort/',
    procedure: [
      'Divide the array into two halves',
      'Recursively sort the two halves',
      'Merge the sorted halves',
      'Continue until the entire array is sorted'
    ],
    stepDetails: [
      'Split the array into two equal halves, creating two subarrays.',
      'Recursively apply the merge sort algorithm to each subarray.',
      'Merge the two sorted subarrays back into a single sorted array.',
      'Continue this process until the entire array is sorted.'
    ],
    implementationNotes: [
      'Uses recursion for divide and conquer approach',
      'Requires temporary arrays for merging',
      'Can be optimized for different data structures',
      'Well-suited for external sorting'
    ],
    code: {
      // ... existing code ...
    }
  },
  'Quicksort': {
    description: 'Quicksort is a highly efficient, comparison-based, divide and conquer sorting algorithm. It works by selecting a pivot element and partitioning the array around the pivot, placing smaller elements to the left and larger elements to the right.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(log n)',
    stable: false,
    advantages: [
      'Very fast on average for large datasets',
      'In-place sorting, requires little extra memory',
      'Cache-friendly due to locality of reference',
      'Efficient for most real-world data',
      'Can be parallelized',
      'Works well with virtual memory'
    ],
    disadvantages: [
      'Unstable — does not preserve order of equal elements',
      'Worst-case time is O(n²), depending on pivot selection',
      'Poor pivot choice can degrade performance',
      'Not suitable for small datasets',
      'Recursive implementation can cause stack overflow'
    ],
    link: 'https://www.geeksforgeeks.org/quick-sort/',
    procedure: [
      'Choose a pivot element',
      'Partition the array around the pivot',
      'Recursively sort the sub-arrays',
      'Combine the results'
    ],
    stepDetails: [
      'Select a pivot element from the array (commonly the last element).',
      'Partition the array by placing elements smaller than the pivot to the left and larger elements to the right.',
      'Recursively apply the quicksort algorithm to the subarrays created by the partition.',
      'Combine the sorted subarrays to form the final sorted array.'
    ],
    implementationNotes: [
      'Pivot selection is crucial for performance',
      'Can be optimized with different partition schemes',
      'Often used as the default sorting algorithm',
      'Can be implemented iteratively to avoid stack overflow'
    ],
    code: {
      // ... existing code ...
    }
  },
  'Heapsort': {
    description: 'Heapsort is a comparison-based sorting algorithm that uses a binary heap data structure. It divides its input into a sorted and an unsorted region, and iteratively shrinks the unsorted region by extracting the largest element and moving it to the sorted region.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(1)',
    stable: false,
    advantages: [
      'In-place algorithm with O(1) extra space',
      'Consistent O(n log n) time complexity',
      'No worst-case performance degradation',
      'Good for embedded systems',
      'Guaranteed performance',
      'Suitable for real-time systems'
    ],
    disadvantages: [
      'Unstable sorting algorithm',
      'Slower than quicksort on average',
      'Less cache-friendly',
      'Not suitable for small datasets',
      'Poor locality of reference'
    ],
    link: 'https://www.geeksforgeeks.org/heap-sort/',
    procedure: [
      'Build a max heap from the input data',
      'Swap the root with the last element',
      'Reduce heap size by 1',
      'Heapify the root',
      'Repeat until heap is empty'
    ],
    stepDetails: [
      'Transform the array into a max heap, where each parent node is greater than or equal to its children.',
      'Swap the root (maximum element) with the last element of the heap.',
      'Reduce the size of the heap by one, effectively removing the last element from consideration.',
      'Restore the max heap property by heapifying the root.',
      'Repeat the process until the heap is empty, resulting in a sorted array.'
    ],
    implementationNotes: [
      'Uses binary heap data structure',
      'Two main phases: heap construction and extraction',
      'Can be implemented iteratively',
      'Well-suited for systems with limited memory'
    ],
    code: {
      // ... existing code ...
    }
  }
} 