import java.util.*;
class MedianFinder {
    private final List<Integer> nums = new ArrayList<>(); // kept sorted // @viz init
    public MedianFinder() {}
    public void addNum(int num) {
        int i = Collections.binarySearch(nums, num); // binary search for the spot // @viz add
        nums.add(i < 0 ? -i - 1 : i, num); // then shift: O(n) // @viz add
    }
    public double findMedian() {
        int n = nums.size(); // already sorted: just read the middle // @viz median
        return n % 2 == 1 ? nums.get(n / 2) : (nums.get(n / 2 - 1) + (double) nums.get(n / 2)) / 2; // @viz median
    }
}
