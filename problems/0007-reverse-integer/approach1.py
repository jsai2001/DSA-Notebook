class Solution(object):
    def reverse(self, x):
        lower_bound = -2**31  # @viz init
        upper_bound = 2**31-1  # @viz init
        rev_int=0  # @viz init
        no_sign_int = abs(x)  # @viz sign
        sign = False if x<0 else True  # @viz sign
        decimal=len(str(no_sign_int))-1  # @viz digits
        while(decimal):  # @viz loop
            rev_int=rev_int+(no_sign_int%10)*(10**decimal)  # @viz place
            decimal=decimal-1  # @viz next
            no_sign_int=no_sign_int//10  # @viz next
        rev_int=rev_int+no_sign_int  # @viz last
        rev_int = rev_int if sign else -rev_int  # @viz restore
        if(rev_int<lower_bound or rev_int>upper_bound):  # @viz check
            return 0  # @viz overflow
        return rev_int  # @viz return
