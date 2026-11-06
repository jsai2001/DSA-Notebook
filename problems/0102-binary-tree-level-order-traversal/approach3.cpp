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
    std::vector<std::vector<int>> levelOrder(TreeNode* root) {
        std::vector<std::vector<int>> result; // @viz init
        std::vector<TreeNode*> level; // the nodes of the current level, left to right // @viz init
        if (root) level.push_back(root); // @viz init
        while (!level.empty()) { // @viz loop
            std::vector<int> vals; // @viz done
            for (TreeNode* node : level) vals.push_back(node->val); // @viz done
            result.push_back(vals); // @viz done
            std::vector<TreeNode*> next; // @viz next
            for (TreeNode* node : level) { // their children, in order, are the next level // @viz next
                if (node->left) next.push_back(node->left); // @viz next
                if (node->right) next.push_back(node->right); // @viz next
            }
            level.swap(next); // @viz swap
        }
        return result; // @viz return
    }
};
