/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
#include <vector>
class Solution {
public:
    int kthSmallest(TreeNode* root, int k) {
        std::vector<TreeNode*> stack; // the path of nodes whose left side is being visited // @viz init
        TreeNode* node = root; // @viz init
        while (true) { // @viz loop
            while (node) { // go as far left as possible: that's the smallest left // @viz down
                stack.push_back(node); // @viz down
                node = node->left; // @viz down
            }
            node = stack.back(); // the next smallest value // @viz pop
            stack.pop_back(); // @viz pop
            if (--k == 0) return node->val; // @viz pop, found
            node = node->right; // then everything to its right, smallest first // @viz right
        }
    }
};
