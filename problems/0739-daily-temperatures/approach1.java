class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length; // @viz init
        int[] ans = new int[n]; // 0 when no warmer day comes // @viz init
        for (int i = 0; i < n; i++) // @viz day
            for (int j = i + 1; j < n; j++) // look ahead, day by day // @viz look
                if (temperatures[j] > temperatures[i]) { // the first warmer day // @viz found
                    ans[i] = j - i; // @viz found
                    break; // @viz found
                }
        return ans; // @viz return
    }
}
