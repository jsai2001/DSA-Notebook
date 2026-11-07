import heapq
class Solution(object):
    def minInterval(self, intervals, queries):
        iv = sorted(intervals)  # by left end  # @viz init
        heap, i, at = [], 0, {}  # heap of (size, right) for intervals that start at or before q  # @viz init
        for q in sorted(set(queries)):  # queries from left to right  # @viz query
            while i < len(iv) and iv[i][0] <= q:  # add every interval that has started  # @viz push
                heapq.heappush(heap, (iv[i][1] - iv[i][0] + 1, iv[i][1]))  # @viz push
                i += 1  # @viz push
            while heap and heap[0][1] < q:  # the smallest one ended before q; later queries are bigger, so drop it for good  # @viz pop
                heapq.heappop(heap)  # @viz pop
            at[q] = heap[0][0] if heap else -1  # @viz answer
        return [at[q] for q in queries]  # back in the original order  # @viz return
