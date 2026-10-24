class Solution(object):
    def findMedianSortedArrays(self, nums1, nums2):
        nums1_len = len(nums1)  # @viz setup
        nums2_len = len(nums2)  # @viz setup
        i = 0  # @viz setup
        j = 0  # @viz setup
        if nums1_len + nums2_len == 1:  # @viz special
            return nums1[0] if nums1_len else nums2[0]  # @viz special
        elif nums1_len + nums2_len == 0:
            return 0

        result = list()  # @viz init
        while i < nums1_len or j < nums2_len:
            if i < nums1_len and j < nums2_len:
                if nums1[i] < nums2[j]:  # @viz take1
                    result.append(nums1[i])  # @viz take1
                    i += 1  # @viz take1
                elif nums1[i] == nums2[j]:  # @viz takeboth
                    result.append(nums1[i])  # @viz takeboth
                    result.append(nums2[j])  # @viz takeboth
                    i += 1  # @viz takeboth
                    j += 1  # @viz takeboth
                else:  # @viz take2
                    result.append(nums2[j])  # @viz take2
                    j += 1  # @viz take2
            else:  # @viz rest
                if i < nums1_len:  # @viz rest
                    result.extend(nums1[i:])  # @viz rest
                else:  # @viz rest
                    result.extend(nums2[j:])  # @viz rest
                break  # @viz rest

        result_len = len(result)  # @viz median
        mid = result_len // 2  # @viz median
        if result_len % 2 == 0:  # @viz median
            return (result[mid - 1] + result[mid]) / 2.0  # @viz median
        else:  # @viz median
            return float(result[mid])  # @viz median
