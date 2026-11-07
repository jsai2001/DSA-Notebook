import random
class Solution(object):
    def kClosest(self, points, k):
        d = [x * x + y * y for x, y in points]  # squared distances  # @viz init
        idx = list(range(len(points)))  # @viz init
        lo, hi = 0, len(idx) - 1  # put the k smallest distances in idx[:k], in any order  # @viz init
        while lo < hi:  # @viz part
            p = random.randint(lo, hi)  # random pivot: no bad input can force O(n²)  # @viz part
            idx[p], idx[hi] = idx[hi], idx[p]  # @viz part
            pivot, store = d[idx[hi]], lo  # @viz part
            for i in range(lo, hi):  # move everything closer than the pivot to the left  # @viz part
                if d[idx[i]] < pivot:  # @viz part
                    idx[i], idx[store] = idx[store], idx[i]  # @viz part
                    store += 1  # @viz part
            idx[store], idx[hi] = idx[hi], idx[store]  # the pivot lands at its sorted place  # @viz part
            if store == k - 1:  # @viz keep
                break  # @viz keep
            if store < k - 1:  # the k-th closest is to the right  # @viz keep
                lo = store + 1  # @viz keep
            else:  # it's to the left  # @viz keep
                hi = store - 1  # @viz keep
        return [points[i] for i in idx[:k]]  # @viz return
