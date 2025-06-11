export const algorithmInfo = {
  'Bubble Sort': {
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
      'Stable sorting algorithm'
    ],
    disadvantages: [
      'Inefficient for large datasets',
      'Poor performance compared to other algorithms',
      'Requires many swaps'
    ],
    link: 'https://www.geeksforgeeks.org/bubble-sort/',
    procedure: [
      'Start from the first element',
      'Compare adjacent elements',
      'Swap if they are in wrong order',
      'Move to next pair',
      'Repeat until no swaps needed'
    ],
    code: {
      js: `async function bubbleSort(arr, updateVisual, delay) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Mark elements being compared
      await sleep(delay);
      
      // Compare adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        updateVisual(arr, { j, j: j + 1 });
        await sleep(delay);
      }
    }
  }
  
  return arr;
}`,
      cpp: `void bubbleSort(int arr[], int n) {
  for (int i = 0; i < n - 1; i++) {
    for (int j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap arr[j] and arr[j+1]
        int temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}`,
      py: `def bubble_sort(arr):
    n = len(arr)
    
    # Traverse through all array elements
    for i in range(n):
        # Last i elements are already in place
        for j in range(0, n-i-1):
            # Traverse the array from 0 to n-i-1
            # Swap if the element found is greater than the next element
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    
    return arr`
    }
  },
  'Selection Sort': {
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
      'Minimizes number of swaps'
    ],
    disadvantages: [
      'Inefficient for large datasets',
      'Not stable (may change order of equal elements)',
      'Always performs O(n²) comparisons'
    ],
    link: 'https://www.geeksforgeeks.org/selection-sort/',
    procedure: [
      'Find minimum element in unsorted array',
      'Swap with first element of unsorted array',
      'Move boundary of unsorted array one element right',
      'Repeat until array is sorted'
    ],
    code: {
      js: `async function selectionSort(arr, updateVisual, delay) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    // Find the minimum element in unsorted array
    let minIdx = i;
    
    for (let j = i + 1; j < n; j++) {
      await sleep(delay);
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    
    // Swap the found minimum element with the first element
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      updateVisual(arr, { i, minIdx });
      await sleep(delay);
    }
  }
  
  return arr;
}`,
      cpp: `void selectionSort(int arr[], int n) {
  int i, j, min_idx;
  
  // One by one move boundary of unsorted subarray
  for (i = 0; i < n - 1; i++) {
    // Find the minimum element in unsorted array
    min_idx = i;
    for (j = i + 1; j < n; j++) {
      if (arr[j] < arr[min_idx])
        min_idx = j;
    }
    
    // Swap the found minimum element with the first element
    if (min_idx != i) {
      int temp = arr[min_idx];
      arr[min_idx] = arr[i];
      arr[i] = temp;
    }
  }
}`,
      py: `def selection_sort(arr):
    n = len(arr)
    
    # Traverse through all array elements
    for i in range(n):
        # Find the minimum element in remaining unsorted array
        min_idx = i
        for j in range(i+1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        
        # Swap the found minimum element with the first element
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    
    return arr`
    }
  },
  'Insertion Sort': {
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
      'Stable sorting algorithm'
    ],
    disadvantages: [
      'Inefficient for large datasets',
      'Requires shifting elements which can be expensive',
      'Poor performance on reverse-sorted arrays'
    ],
    link: 'https://www.geeksforgeeks.org/insertion-sort/',
    procedure: [
      'Start from the second element (index 1)',
      'Compare it with the previous elements',
      'If the previous element is greater, move it one position ahead',
      'Continue this process until the correct position for the current element is found',
      'Repeat for all elements in the array'
    ],
    code: {
      js: `async function insertionSort(arr, updateVisual, delay) {
  const n = arr.length;
  
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    
    await sleep(delay);
    
    // Move elements of arr[0..i-1] that are greater than key
    // to one position ahead of their current position
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      updateVisual(arr, { j, j: j + 1 });
      await sleep(delay);
      j--;
    }
    
    arr[j + 1] = key;
    updateVisual(arr, { j: j + 1 });
  }
  
  return arr;
}`,
      cpp: `void insertionSort(int arr[], int n) {
  int i, key, j;
  for (i = 1; i < n; i++) {
    key = arr[i];
    j = i - 1;
    
    /* Move elements of arr[0..i-1], that are greater than key,
       to one position ahead of their current position */
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
}`,
      py: `def insertion_sort(arr):
    # Traverse through 1 to len(arr)
    for i in range(1, len(arr)):
        key = arr[i]
        
        # Move elements of arr[0..i-1], that are greater than key,
        # to one position ahead of their current position
        j = i - 1
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    
    return arr`
    }
  },
  'Merge Sort': {
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
      'Good for external sorting'
    ],
    disadvantages: [
      'Requires extra memory proportional to input size',
      'Slower than some algorithms for small datasets',
      'Not in-place sorting algorithm'
    ],
    link: 'https://www.geeksforgeeks.org/merge-sort/',
    procedure: [
      'Divide the array into two halves',
      'Recursively sort the two halves',
      'Merge the sorted halves',
      'Continue until the entire array is sorted'
    ],
    code: {
      js: `async function mergeSort(arr, left, right, updateVisual, delay) {
  if (left < right) {
    // Find the middle point
    const mid = Math.floor((left + right) / 2);
    
    // Sort first and second halves
    await mergeSort(arr, left, mid, updateVisual, delay);
    await mergeSort(arr, mid + 1, right, updateVisual, delay);
    
    // Merge the sorted halves
    await merge(arr, left, mid, right, updateVisual, delay);
  }
  
  return arr;
}

async function merge(arr, left, mid, right, updateVisual, delay) {
  const n1 = mid - left + 1;
  const n2 = right - mid;
  
  // Create temp arrays
  const L = new Array(n1);
  const R = new Array(n2);
  
  // Copy data to temp arrays L[] and R[]
  for (let i = 0; i < n1; i++) {
    L[i] = arr[left + i];
  }
  for (let j = 0; j < n2; j++) {
    R[j] = arr[mid + 1 + j];
  }
  
  // Merge the temp arrays back into arr[left..right]
  let i = 0; // Initial index of first subarray
  let j = 0; // Initial index of second subarray
  let k = left; // Initial index of merged subarray
  
  while (i < n1 && j < n2) {
    await sleep(delay);
    
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    
    updateVisual(arr, { k });
    k++;
  }
  
  // Copy the remaining elements of L[], if there are any
  while (i < n1) {
    await sleep(delay);
    arr[k] = L[i];
    updateVisual(arr, { k });
    i++;
    k++;
  }
  
  // Copy the remaining elements of R[], if there are any
  while (j < n2) {
    await sleep(delay);
    arr[k] = R[j];
    updateVisual(arr, { k });
    j++;
    k++;
  }
}`,
      cpp: `// Merges two subarrays of arr[].
// First subarray is arr[l..m]
// Second subarray is arr[m+1..r]
void merge(int arr[], int l, int m, int r) {
  int n1 = m - l + 1;
  int n2 = r - m;
  
  // Create temp arrays
  int L[n1], R[n2];
  
  // Copy data to temp arrays L[] and R[]
  for (int i = 0; i < n1; i++)
    L[i] = arr[l + i];
  for (int j = 0; j < n2; j++)
    R[j] = arr[m + 1 + j];
  
  // Merge the temp arrays back into arr[l..r]
  int i = 0; // Initial index of first subarray
  int j = 0; // Initial index of second subarray
  int k = l; // Initial index of merged subarray
  
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    k++;
  }
  
  // Copy the remaining elements of L[], if there are any
  while (i < n1) {
    arr[k] = L[i];
    i++;
    k++;
  }
  
  // Copy the remaining elements of R[], if there are any
  while (j < n2) {
    arr[k] = R[j];
    j++;
    k++;
  }
}

// l is for left index and r is right index of the sub-array of arr to be sorted
void mergeSort(int arr[], int l, int r) {
  if (l < r) {
    // Same as (l+r)/2, but avoids overflow for large l and h
    int m = l + (r - l) / 2;
    
    // Sort first and second halves
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    
    merge(arr, l, m, r);
  }
}`,
      py: `def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2  # Finding the mid of the array
        L = arr[:mid]  # Dividing the array elements into 2 halves
        R = arr[mid:]
        
        merge_sort(L)  # Sorting the first half
        merge_sort(R)  # Sorting the second half
        
        i = j = k = 0
        
        # Copy data to temp arrays L[] and R[]
        while i < len(L) and j < len(R):
            if L[i] <= R[j]:
                arr[k] = L[i]
                i += 1
            else:
                arr[k] = R[j]
                j += 1
            k += 1
        
        # Checking if any element was left
        while i < len(L):
            arr[k] = L[i]
            i += 1
            k += 1
        
        while j < len(R):
            arr[k] = R[j]
            j += 1
            k += 1
    
    return arr`
    }
  },
  'Quicksort': {
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
      'Efficient for most real-world data'
    ],
    disadvantages: [
      'Unstable — does not preserve order of equal elements',
      'Worst-case time is O(n²), depending on pivot selection',
      'Poor pivot choice can degrade performance',
      'Not suitable for small datasets'
    ],
    link: 'https://www.geeksforgeeks.org/quick-sort/',
    procedure: [
      'Choose a pivot element',
      'Partition the array around the pivot',
      'Recursively sort the sub-arrays',
      'Combine the results'
    ],
    code: {
      js: `async function quickSort(arr, low, high, updateVisual, delay) {
  if (low < high) {
    // pi is partitioning index, arr[pi] is now at right place
    const pi = await partition(arr, low, high, updateVisual, delay);
    
    // Separately sort elements before partition and after partition
    await quickSort(arr, low, pi - 1, updateVisual, delay);
    await quickSort(arr, pi + 1, high, updateVisual, delay);
  }
  
  return arr;
}

async function partition(arr, low, high, updateVisual, delay) {
  // Pivot (Element to be placed at right position)
  const pivot = arr[high];
  
  let i = low - 1; // Index of smaller element
  
  for (let j = low; j <= high - 1; j++) {
    await sleep(delay);
    
    // If current element is smaller than the pivot
    if (arr[j] < pivot) {
      i++; // Increment index of smaller element
      
      // Swap arr[i] and arr[j]
      [arr[i], arr[j]] = [arr[j], arr[i]];
      updateVisual(arr, { i, j });
      await sleep(delay);
    }
  }
  
  // Swap arr[i + 1] and arr[high] (or pivot)
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  updateVisual(arr, { i: i + 1, high });
  await sleep(delay);
  
  return i + 1;
}`,
      cpp: `// A utility function to swap two elements
void swap(int* a, int* b) {
  int t = *a;
  *a = *b;
  *b = t;
}

/* This function takes last element as pivot, places
   the pivot element at its correct position in sorted
   array, and places all smaller (smaller than pivot)
   to left of pivot and all greater elements to right
   of pivot */
int partition(int arr[], int low, int high) {
  int pivot = arr[high]; // pivot
  int i = (low - 1); // Index of smaller element
  
  for (int j = low; j <= high - 1; j++) {
    // If current element is smaller than the pivot
    if (arr[j] < pivot) {
      i++; // increment index of smaller element
      swap(&arr[i], &arr[j]);
    }
  }
  swap(&arr[i + 1], &arr[high]);
  return (i + 1);
}

/* The main function that implements QuickSort
   arr[] --> Array to be sorted,
   low --> Starting index,
   high --> Ending index */
void quickSort(int arr[], int low, int high) {
  if (low < high) {
    /* pi is partitioning index, arr[p] is now
       at right place */
    int pi = partition(arr, low, high);
    
    // Separately sort elements before
    // partition and after partition
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}`,
      py: `def quick_sort(arr, low, high):
    if low < high:
        # pi is partitioning index, arr[pi] is now at right place
        pi = partition(arr, low, high)
        
        # Separately sort elements before partition and after partition
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)
    
    return arr

def partition(arr, low, high):
    # Choose the rightmost element as pivot
    pivot = arr[high]
    
    # Index of smaller element
    i = low - 1
    
    for j in range(low, high):
        # If current element is smaller than the pivot
        if arr[j] < pivot:
            # Increment index of smaller element
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`
    }
  },
  'Heapsort': {
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
      'Good for embedded systems'
    ],
    disadvantages: [
      'Unstable sorting algorithm',
      'Slower than quicksort on average',
      'Less cache-friendly',
      'Not suitable for small datasets'
    ],
    link: 'https://www.geeksforgeeks.org/heap-sort/',
    procedure: [
      'Build a max heap from the input data',
      'Swap the root with the last element',
      'Reduce heap size by 1',
      'Heapify the root',
      'Repeat until heap is empty'
    ],
    code: {
      js: `async function heapSort(arr, updateVisual, delay) {
  const n = arr.length;
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(arr, n, i, updateVisual, delay);
  }
  
  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    updateVisual(arr, { 0, i });
    await sleep(delay);
    
    // Call max heapify on the reduced heap
    await heapify(arr, i, 0, updateVisual, delay);
  }
  
  return arr;
}

// To heapify a subtree rooted with node i which is an index in arr[]
// n is size of heap
async function heapify(arr, n, i, updateVisual, delay) {
  let largest = i; // Initialize largest as root
  const left = 2 * i + 1; // left = 2*i + 1
  const right = 2 * i + 2; // right = 2*i + 2
  
  // If left child is larger than root
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  
  // If right child is larger than largest so far
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  
  // If largest is not root
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    updateVisual(arr, { i, largest });
    await sleep(delay);
    
    // Recursively heapify the affected sub-tree
    await heapify(arr, n, largest, updateVisual, delay);
  }
}`,
      cpp: `// To heapify a subtree rooted with node i which is
// an index in arr[]. n is size of heap
void heapify(int arr[], int n, int i) {
  int largest = i; // Initialize largest as root
  int l = 2 * i + 1; // left = 2*i + 1
  int r = 2 * i + 2; // right = 2*i + 2
  
  // If left child is larger than root
  if (l < n && arr[l] > arr[largest])
    largest = l;
  
  // If right child is larger than largest so far
  if (r < n && arr[r] > arr[largest])
    largest = r;
  
  // If largest is not root
  if (largest != i) {
    swap(&arr[i], &arr[largest]);
    
    // Recursively heapify the affected sub-tree
    heapify(arr, n, largest);
  }
}

// main function to do heap sort
void heapSort(int arr[], int n) {
  // Build heap (rearrange array)
  for (int i = n / 2 - 1; i >= 0; i--)
    heapify(arr, n, i);
  
  // One by one extract an element from heap
  for (int i = n - 1; i > 0; i--) {
    // Move current root to end
    swap(&arr[0], &arr[i]);
    
    // call max heapify on the reduced heap
    heapify(arr, i, 0);
  }
}`,
      py: `def heapify(arr, n, i):
    largest = i  # Initialize largest as root
    l = 2 * i + 1  # left = 2*i + 1
    r = 2 * i + 2  # right = 2*i + 2
    
    # See if left child of root exists and is greater than root
    if l < n and arr[largest] < arr[l]:
        largest = l
    
    # See if right child of root exists and is greater than root
    if r < n and arr[largest] < arr[r]:
        largest = r
    
    # Change root if needed
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]  # swap
        
        # Heapify the root
        heapify(arr, n, largest)

def heap_sort(arr):
    n = len(arr)
    
    # Build a maxheap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    # One by one extract elements
    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]  # swap
        heapify(arr, i, 0)
    
    return arr`
    }
  }
}