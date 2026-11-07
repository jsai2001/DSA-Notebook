class Solution {
    public boolean mergeTriplets(int[][] triplets, int[] target) {
        int[] merged = new int[3]; // @viz init
        for (int[] t : triplets) // @viz scan
            if (t[0] <= target[0] && t[1] <= target[1] && t[2] <= target[2]) // safe: it can't push any value past the target // @viz merge
                for (int k = 0; k < 3; k++) merged[k] = Math.max(merged[k], t[k]); // @viz merge
        return merged[0] == target[0] && merged[1] == target[1] && merged[2] == target[2]; // merging every safe triplet gets as close as possible // @viz return
    }
}
